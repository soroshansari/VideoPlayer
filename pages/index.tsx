import { GetServerSideProps } from "next";
import React, { useEffect, useRef } from "react";
import { MongoClient, ServerApiVersion } from "mongodb";

export const Index = ({ src, type }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem(src);
      if (savedTime?.length && ref?.current) {
        ref.current.currentTime = +savedTime;
      }
    }
  }, []);

  const onTimeUpdate = ({ target }) => {
    localStorage.setItem(src, target?.currentTime.toString());
  };
  return (
    <video
      ref={ref}
      width="600"
      height="500"
      controls
      preload="auto"
      onTimeUpdate={onTimeUpdate}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1,
  });
  const connection = await client.connect();
  const movie = await client.db("video-player").collection("movies").findOne();

  connection.close();

  return {
    props: {
      src: movie.src,
      type: movie.type,
    },
  };
};

export default Index;
