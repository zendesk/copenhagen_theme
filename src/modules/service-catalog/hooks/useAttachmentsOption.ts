import { useEffect, useState } from "react";
import type {
  AttachmentsOption,
  AttachmentsOptionResponse,
} from "../data-types/Attachments";

export function useAttachmentsOption(attachmentsOptionId?: string) {
  const [attachmentsOption, setAttachmentsOption] = useState<
    AttachmentsOption | undefined
  >();
  const [isLoadingAttachmentsOption, setIsLoadingAttachmentsOption] =
    useState(false);
  const [errorAttachmentsOption, setErrorAttachmentsOption] =
    useState<unknown>(null);

  useEffect(() => {
    if (!attachmentsOptionId) {
      setAttachmentsOption(undefined);
      setErrorAttachmentsOption(null);
      setIsLoadingAttachmentsOption(false);
      return;
    }
    const fetchAttachmentsOption = async () => {
      setErrorAttachmentsOption(null);
      setIsLoadingAttachmentsOption(false);
      try {
        const response = await fetch(
          `/api/v2/custom_objects/standard::service_catalog_attachment_option/records/${attachmentsOptionId}`
        );
        if (response.ok) {
          const data: AttachmentsOptionResponse = await response.json();
          setAttachmentsOption(data.custom_object_record);
        } else {
          throw new Error("Error fetching service catalog item");
        }
      } catch (error) {
        setErrorAttachmentsOption(error);
      } finally {
        setIsLoadingAttachmentsOption(false);
      }
    };
    fetchAttachmentsOption();
  }, [attachmentsOptionId]);

  return {
    attachmentsOption,
    errorAttachmentsOption,
    isLoadingAttachmentsOption,
  };
}
