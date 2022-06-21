import { INKDROP_API, INKDROP_PLUGIN_URL } from "@/config";
import type { InkdropPlugin } from "@/types";

const plugins = ["code-title", "link-card", "chartjs"];

export const getInkdropPlugins = async (): Promise<InkdropPlugin[]> => {
  const data: InkdropPlugin[] = await Promise.all(
    plugins.map(async (plugin) => {
      const href = new URL(plugin, INKDROP_API).href;
      const res = await fetch(href);
      const json = await res.json();

      return {
        name: plugin,
        href: new URL(plugin, INKDROP_PLUGIN_URL).href,
        imageSrc: `/images/inkdrop-${plugin}.png`,
        downloads: json.downloads,
      };
    })
  );

  return data;
};
