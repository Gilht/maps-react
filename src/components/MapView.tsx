import { useContext, useLayoutEffect, useRef, useTransition } from "react";
import { MapContext, PlacesContext } from "../context/index";
import { Loading } from "./Loading";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  const [isPending, startTransition] = useTransition(); // 👈 concurrent rendering hook
  const mapKEY = "xwANgCfucb3swXtUQm8y";

  useLayoutEffect(() => {
    if (!isLoading && userLocation) {
      startTransition(() => {
        const map = new maplibregl.Map({
          container: mapDiv.current!,
          style: `https://api.maptiler.com/maps/topo/style.json?key=${mapKEY}`,
          center: userLocation,
          zoom: 4,
        });
        setMap(map);
      });
    }
  }, [isLoading, userLocation]);

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div
      ref={mapDiv}
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {userLocation?.join(",")}
    </div>
  );
};
