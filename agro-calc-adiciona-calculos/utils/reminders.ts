import * as Notifications from "expo-notifications";

export const scheduleAdubacaoReminder = async (crop: string) => {
  const trigger: Notifications.TimeIntervalTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 30 * 24 * 60 * 60,
    repeats: false,
  };
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "AgroCalc • Adubação de cobertura",
      body: `Hora de realizar a adubação de cobertura do ${crop}`,
    },
    trigger,
  });
};