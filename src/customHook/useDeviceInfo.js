import { useCallback, useEffect, useState } from "react";
import throttle from 'lodash/throttle'

const initialDeviceInfo = {
    isMobile: false,
    isTablet: false,
    isDesktop: false
};

export const useDeviceInfo = () => {
    const initialValue = {...initialDeviceInfo};
    const [deviceInfo, setDeviceInfo] = useState(initialValue);

    const updateDeviceInfo = useCallback(() => {
        initialValue.isMobile = window.innerWidth < 641;
        initialValue.isTablet = window.innerWidth < 1025;
        initialValue.isDesktop = window.innerWidth > 1025;
        setDeviceInfo({...initialValue});
    }, []);

    useEffect(() => {
        const throttledUpdateLayout = throttle(updateDeviceInfo, 100);
        updateDeviceInfo();
        window.addEventListener("resize", throttledUpdateLayout);

        return () => {
            window.removeEventListener("resize", throttledUpdateLayout);
        }
    }, []);

    return deviceInfo;
};
