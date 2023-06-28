import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import Button from "@/components/button";
import { Input } from "@/components/input";
import Modal from "@/components/modal";
import { useUploadModal } from "@/hooks/use-upload-modal";
import useUser from "@/hooks/use-user";

export interface UploadModalProps {}

export function UploadModal() {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const handleChange = useCallback(
    (open: boolean) => {
      if (!open) {
        reset();
        uploadModal.onClose();
      }
    },
    [reset, uploadModal]
  );

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (values) => {
      try {
        setIsLoading(true);

        const imageFile = values.image?.[0];
        const songFile = values.song?.[0];

        if (!imageFile || !songFile || !user) {
          toast.error("Missing field");
          return;
        }

        const uniqueId = uniqid();

        // Upload song
        const { data: songData, error: songError } =
          await supabaseClient.storage
            .from("songs")
            .upload(`song-${values.title}-${uniqueId}`, songFile, {
              cacheControl: "3600",
              upsert: false,
            });

        if (songError) {
          setIsLoading(false);
          return toast.error("Failed song upload.");
        }

        // Upload image
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(`image-${values.title}-${uniqueId}`, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });

        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed image upload.");
        }

        const { error: supabaseError } = await supabaseClient
          .from("songs")
          .insert({
            user_id: user.id,
            title: values.title,
            author: values.author,
            image_path: imageData?.path,
            song_path: songData?.path,
          });

        if (supabaseError) {
          setIsLoading(false);
          return toast.error(supabaseError.message);
        }

        router.refresh();
        setIsLoading(false);
        toast.success("Song created!");
        reset();
        uploadModal.onClose();
      } catch (e) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [reset, router, supabaseClient, uploadModal, user]
  );

  return (
    <Modal
      title="Add a song"
      description="Upload an MP3 file"
      isOpen={uploadModal.isOpen}
      onChange={handleChange}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />

        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />

        <div>
          <div className="pb-1">Select a song file</div>

          <Input
            id="song"
            type="file"
            disabled={isLoading}
            {...register("song", { required: true })}
            accept=".mp3"
          />
        </div>

        <div>
          <div className="pb-1">Select an image</div>

          <Input
            id="image"
            type="file"
            disabled={isLoading}
            {...register("image", { required: true })}
            accept="image/*"
          />
        </div>

        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}
