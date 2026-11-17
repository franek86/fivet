import { Check, UserPlus } from "lucide-react";
import { SaveContactBtn } from "./Inquery.styles.js";

function SaveContactButton({ onSaveContact, isSaving, isSaved }) {
  return (
    <SaveContactBtn type='button' onClick={onSaveContact} disabled={isSaving || isSaved}>
      {isSaved ? <Check size={16} /> : <UserPlus size={16} />}
      {isSaved ? "Saved to address book" : isSaving ? "Saving..." : "Save to address book"}
    </SaveContactBtn>
  );
}

export default SaveContactButton;
