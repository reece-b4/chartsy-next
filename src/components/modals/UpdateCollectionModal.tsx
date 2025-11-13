"use client";

import { useState } from "react";
import { TextField, Stack, Snackbar, Alert } from "@mui/material";
import { useModal } from "@/components/modals/ModalProvider";
import { updateCollection } from "@/services/actions/collections";

// buttons: should be passed to modal provider along with modalContent etc and linked via form id (close button is provided automatically and this pattern keeps them in line in UI)
// eg:
//  openModal({
//   title: `Update collection: ${collection.collection_name}`,
//   content: (
//     <UpdateCollectionModal collectionId={collection.id} initialName={collection.collection_name} initialIcon={collection.icon} />
//   ),
//   actions: (<Button type="submit" form="update-collection-form" variant="contained">Save</Button>),
// });

type UpdateCollectionModalProps = {
  collectionId: number;
  initialName: string;
  initialIcon?: string | null;
};
export default function UpdateCollectionModal({
  collectionId,
  initialName,
  initialIcon,
}: UpdateCollectionModalProps) {
  const [name, setName] = useState(initialName);
  const [icon, setIcon] = useState(initialIcon ?? "");
  const [saving, setSaving] = useState(false);
  const { closeModal } = useModal();
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let newName: string | undefined = undefined;
      let newIcon: string | undefined = undefined;

      if (name === initialName && icon === (initialIcon ?? "")) {
        closeModal();
        return;
      }

      if (name && name !== initialName) {
        newName = name;
      }

      if (icon && icon !== (initialIcon ?? "")) {
        newIcon = icon;
      }

      await updateCollection(collectionId, newName, newIcon);
      closeModal();
    } catch (err) {
      console.error("Failed to update collection:", err);
      setError("Failed to update collection. Please try again.");
      setShowError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form id="update-collection-form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          value={name}
          fullWidth
          size="small"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Icon"
          value={icon}
          fullWidth
          size="small"
          onChange={(e) => setIcon(e.target.value)}
          helperText="Use an emoji or short text."
        />
      </Stack>
      {/* No buttons here – See top of file for modal actions */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert
          severity="error"
          onClose={() => setShowError(false)}
          sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </form>
  );
}
