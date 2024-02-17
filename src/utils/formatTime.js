
import numberEmptyCheck from './numberEmptyCheck'
const mapFormatTime = new Map();
export default function formatTime(timeInSeconds = 0) {
  if (mapFormatTime.has(timeInSeconds)) return mapFormatTime.get(timeInSeconds);

  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const remainingSeconds = Math.floor(timeInSeconds % 60);
  
const finValues = {
    minutes: minutes,
    seconds: remainingSeconds,
    hours: hours
  };

  mapFormatTime.set(timeInSeconds, finValues);

  return finValues;
}
