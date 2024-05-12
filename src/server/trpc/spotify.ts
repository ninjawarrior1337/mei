import { z } from "zod";
import { t } from "./trpc";

import {
  QuantizerCelebi,
  Scheme,
  Score,
  argbFromRgb,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import { extractColors } from "extract-colors";
import sharp from "sharp";

//@ts-ignore
const HASS_API_KEY = import.meta.env.HASS_API_KEY;
//@ts-ignore
const HASS_API_URL = import.meta.env.HASS_API_URL;

const spotifyMediaInfo = z.object({
  media_content_type: z.enum(["podcast", "music"]),
  media_title: z.string(),
  media_artist: z.string(),
  media_album_name: z.string(),
  media_track: z.number().int(),
  entity_picture: z.string(),
  media_content_id: z.string(),
});

const getSpotifyMediaInfo = async () => {
  const res = await fetch(
    `${HASS_API_URL}/api/states/media_player.spotify_treelar`,
    {
      headers: {
        Authorization: `Bearer ${HASS_API_KEY}`,
      },
    },
  );
  const data = await res.json();

  if (data.state == "idle") {
    return null;
  }

  const parsed = spotifyMediaInfo.parse(data.attributes);

  return {
    ...parsed,
    entity_picture: `${HASS_API_URL}${parsed.entity_picture}`,
  };
};

type Keys<T extends Record<any, any>> =
  T extends Record<infer K, any> ? K : any;
type G = Keys<ReturnType<Scheme["toJSON"]>>;

const schemeToRGBScheme = (s: Scheme): Record<G, string> => {
  return Object.fromEntries(
    Object.entries(s.toJSON()).map(([s, v]) => [s, hexFromArgb(v)]),
  ) as Record<G, string>;
};

export const spotify = t.router({
  songInfo: t.procedure.query(async () => {
    return await getSpotifyMediaInfo();
  }),
  coverInfo: t.procedure.query(async () => {
    const mediaInfo = await getSpotifyMediaInfo();

    if (mediaInfo == null) {
      return mediaInfo;
    }

    const res = await fetch(`${mediaInfo.entity_picture}`);

    const { data, info } = await sharp(await res.arrayBuffer())
      .raw()
      .withIccProfile("srgb", { attach: false })
      .toBuffer({ resolveWithObject: true });

    const pixels: number[] = [];
    for (let i = 0; i < data.length; i += 3) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const argb = argbFromRgb(r, g, b);
      pixels.push(argb);
    }

    const colors = await extractColors({
      width: info.width,
      height: info.height,
      data: new Uint8ClampedArray(data),
    });
    const m3q = QuantizerCelebi.quantize(pixels, 128);
    const ranked = Score.score(m3q);
    const top = ranked[0];

    const schemes = themeFromSourceColor(top).schemes;

    return {
      coverUrl: mediaInfo.entity_picture,
      colors: {
        topk: colors.slice(0, 5).map((c) => c.hex),
        materialYou: {
          light: schemeToRGBScheme(schemes.light),
          dark: schemeToRGBScheme(schemes.dark),
        },
      },
    };
  }),
});
