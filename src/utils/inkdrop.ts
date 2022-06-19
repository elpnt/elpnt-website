const inkdrop_api = process.env.INKDROP_API as string;

type PluginData = {
  version: string;
  downloads: number;
};

export const getInkdropPluginsData = async (
  names: string[]
): Promise<PluginData[]> => {
  return Promise.all(
    names.map(async (name) => {
      console.log(inkdrop_api, name);
      const url = new URL(name, inkdrop_api).toString();
      const res = await fetch(url);
      const json = await res.json();

      return {
        version: json.releases.latest,
        downloads: json.downloads,
      };
    })
  );
};
