import { useStorage } from "../hooks/useStorage";
import { storage } from "../core/storage/localStorageHandler";

storage.startPolling();

const SetterComponent = () => {
  const [, setValue] = useStorage<string>("shared-key", "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Setter Component</h2>
      <input type="text" onChange={handleChange} placeholder="Type something..." />
    </div>
  );
};

const ViewerComponent = () => {
  const [value] = useStorage<string>("shared-key", "");

  return (
    <div>
      <h2>Viewer Component</h2>
      <p>Current Value: <b>{value}</b></p>
    </div>
  );
};

const Storage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>LocalStorage Handler - Dynamic Type-Safe Mode</h1>
      <SetterComponent />
      <ViewerComponent />
    </div>
  );
};

export default Storage;
