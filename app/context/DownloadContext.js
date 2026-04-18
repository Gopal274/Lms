import React, { createContext, useState, useContext, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DownloadContext = createContext();

export const DownloadProvider = ({ children }) => {
  const [downloads, setDownloads] = useState({}); // { lessonId: { status, progress, localPath } }

  useEffect(() => {
    loadDownloadData();
  }, []);

  const loadDownloadData = async () => {
    try {
      const saved = await AsyncStorage.getItem("downloads");
      if (saved) {
        setDownloads(JSON.parse(saved));
      }
    } catch (e) {
      console.log("Failed to load downloads", e);
    }
  };

  const updateDownload = async (lessonId, data) => {
    const newDownloads = { ...downloads, [lessonId]: { ...downloads[lessonId], ...data } };
    setDownloads(newDownloads);
    await AsyncStorage.setItem("downloads", JSON.stringify(newDownloads));
  };

  const startDownload = async (lessonId, videoUrl) => {
    try {
      // Basic check: Expo FileSystem downloadResumable
      const fileName = `${lessonId}.mp4`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      await updateDownload(lessonId, { status: "downloading", progress: 0 });

      const downloadResumable = FileSystem.createDownloadResumable(
        videoUrl,
        fileUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          updateDownload(lessonId, { progress });
        }
      );

      const { uri } = await downloadResumable.downloadAsync();
      await updateDownload(lessonId, { status: "completed", progress: 1, localPath: uri });
      console.log("Download completed", uri);
    } catch (e) {
      console.log("Download failed", e);
      await updateDownload(lessonId, { status: "failed", progress: 0 });
    }
  };

  const deleteDownload = async (lessonId) => {
    try {
        const item = downloads[lessonId];
        if (item && item.localPath) {
            await FileSystem.deleteAsync(item.localPath);
        }
        const newDownloads = { ...downloads };
        delete newDownloads[lessonId];
        setDownloads(newDownloads);
        await AsyncStorage.setItem("downloads", JSON.stringify(newDownloads));
    } catch (e) {
        console.log("Failed to delete download", e);
    }
  };

  return (
    <DownloadContext.Provider value={{ downloads, startDownload, deleteDownload }}>
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownloads = () => useContext(DownloadContext);
