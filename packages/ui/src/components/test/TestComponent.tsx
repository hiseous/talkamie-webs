
'use client';

import { fromSeconds } from "../../utils/funcs/time/seconds";
import { useTimer } from "../../utils/funcs/time/useTimer";
import Button from "../button/Button";

const TestComponent = () => {
    const timer = useTimer();
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Button>
                secs: {fromSeconds(timer.seconds).text}
            </Button>
            <Button onClick={timer.start}>
                start
            </Button>
            <Button onClick={timer.pause}>
                pause
            </Button>
            <Button onClick={timer.resume}>
                resume
            </Button>
            <Button onClick={timer.stop}>
                stop
            </Button>
            <Button onClick={timer.reset}>
                reset
            </Button>
            <Button onClick={() => {
                timer.stop();
                timer.reset();
            }}>
                stop & reset
            </Button>
        </div>
    );
}

export default TestComponent;