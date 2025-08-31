
'use client';

import { useEffect, useState } from "react";

type status = 'playing' | 'stopped' | 'paused';
type time = {
    seconds?: number;
    status?: status;
}
type useTimerProps = {
    initialSeconds?: number;
    finalSeconds?: number;
    direction?: 'asc' | 'desc';
}

export const useTimer = (props?: useTimerProps) => {
    // const reRender = useRerenderComponent();
    // const time = useRef<time>({});
    const [time, setTime] = useState<time>({});
    // const [status, setStatus] = useState<status | undefined>(undefined);

    const handles = {
        start: () => {
            // time.current.seconds = props?.initialSeconds ?? 0;
            // time.current.status = 'playing';
            // reRender.trigger();
            // setStatus('playing');
            setTime(prev => ({
                ...prev,
                seconds: props?.initialSeconds ?? 0,
                status: 'playing',
            }));
        },
        pause: () => {
            // time.current.status = time.current.status === 'playing' ? 'paused' : time.current.status;
            // reRender.trigger();
            // setStatus(prev => prev === 'playing' ? 'paused' : prev);
            setTime(prev => ({
                ...prev,
                status: prev.status === 'playing' ? 'paused' : prev.status,
            }));
        },
        resume: () => {
            // time.current.status = time.current.status === 'paused' ? 'playing' : time.current.status;
            // reRender.trigger();
            // setStatus(prev => prev === 'paused' ? 'playing' : prev);
            setTime(prev => ({
                ...prev,
                status: prev.status === 'paused' ? 'playing' : prev.status,
            }));
        },
        stop: () => {
            // time.current.status = 'stopped';
            // reRender.trigger();
            // setStatus('stopped');
            setTime(prev => ({
                ...prev,
                status: 'stopped',
            }));
        },
        reset: () => {
            // time.current = {};
            // reRender.trigger();
            // setStatus(undefined);
            setTime({});
        },
    };

    useEffect(() => {
        if(time.status === 'playing'){
            setTimeout(() => {
                // const newSec = (time.seconds ?? 0) + (props?.direction === 'desc' ? -1 : 1);
                // const finalSec = props?.finalSeconds;
                // const status = (
                //     time.status === 'stopped' ? 'stopped' :
                //     props?.direction === 'desc' ? (
                //         (typeof finalSec === 'number' && newSec <= finalSec) ? 'stopped' : 'playing'
                //     ) : (
                //         (typeof finalSec === 'number' && newSec >= finalSec) ? 'stopped' : 'playing'
                //     )
                // );
                // time.current.seconds = newSec;
                // time.current.status = status;
                // reRender.trigger();

                // setTime(prev => ({
                //     ...prev,
                //     seconds: newSec,
                //     status,
                // }));
                setTime(prev => {
                    // console.log('prev', prev)
                    const newSec = !prev.status ? undefined : (prev.seconds ?? 0) + (props?.direction === 'desc' ? -1 : 1);
                    const finalSec = props?.finalSeconds;
                    const status = (
                        (['paused', 'stopped', undefined] as (status | undefined)[]).includes(prev.status) ? prev.status :
                        props?.direction === 'desc' ? (
                            (typeof newSec === 'number' && typeof finalSec === 'number' && newSec <= finalSec) ? 'stopped' : 'playing'
                        ) : (
                            (typeof newSec === 'number' && typeof finalSec === 'number' && newSec >= finalSec) ? 'stopped' : 'playing'
                        )
                    );

                    return {
                        ...prev,
                        seconds: newSec,
                        status,
                    };
                    // return {...prev};
                })
            }, 1000);
        }
    }, [time.seconds, time.status]);
    
    return {
        ...handles,
        // ...time.current,
        ...time,
        // status,
    };
};