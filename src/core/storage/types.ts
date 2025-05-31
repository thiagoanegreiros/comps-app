export type StorageTypes = {
  user: { name: string; age: number };
  settings: { darkMode: boolean };
  token: string;
  'shared-key': string;
};

export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];
export type Callback<T> = (value: T | null) => void;