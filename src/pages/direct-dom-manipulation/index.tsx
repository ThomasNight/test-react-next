import { useRef } from "react";

export const DirectDomManipulationPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus() {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} name="name" />
      <button onClick={handleFocus}>Focus</button>
    </div>
  );
};

export default DirectDomManipulationPage;
