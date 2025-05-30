import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useCrop } from "../../hooks/useCrops";

import YoutubePlayer from "react-native-youtube-iframe";
import { View, StyleSheet } from "react-native";


export default function VideoScreen() {
  const { cropId } = useLocalSearchParams<{ cropId: string }>();
  const crop = useCrop(cropId!);
  if (!crop) return null;
  return (
    <View style={styles.container}>
      <YoutubePlayer height={240} play videoId={crop.videoId} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: "center" } });
