import { useEffect } from 'react';
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";

const useVoiceReader = (text, condition) => {
    const { speak, speaking, stopSpeaking } = UseSpeechSynthesis();
    useEffect(() => {
        if (condition && !speaking) {
            speak(text);
        } else if (!condition && speaking) {
            stopSpeaking();
        }
    }, [text, condition, speaking, speak, stopSpeaking]);
    return { speaking };
}

export default useVoiceReader;