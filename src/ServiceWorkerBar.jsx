import React, {
    useRef,
    useState,
    useEffect,
} from "react"
import Button from "@material-ui/core/Button"

function ServiceWorkerBar(props) {
    const {
        scope,
        worker
    } = props
    const [swInited, setSwInited] = useState(false)
    const [version, setVersion] = useState(null)
    var reloadRef = useRef(null)
    var notifyRef = useRef(null)
    var classes = {}
    const getVersion = () => {
        if (navigator.serviceWorker) {
            if (navigator.serviceWorker.controller) {
                var messageChannel = new MessageChannel();
                messageChannel.port1.onmessage = function(event) {
                    setVersion(event.data.version)
                }
                navigator.serviceWorker.controller.postMessage({
                    "command": "version",
                }, [messageChannel.port2]); //serviceWork.js API
            } else {
                console.log("No service worker controller");
            }
        }
    }
    const initVersion = () => {
        if (!swInited) {
            if (navigator.serviceWorker) {
                console.log("Service Worker Supported");
                var newWorker
                reloadRef.current.addEventListener('click', function() {
                    newWorker.postMessage({
                        action: 'skipWaiting'
                    });
                });
                navigator.serviceWorker.register(worker, {
                        scope: scope
                    })
                    .then(function(reg) {
                        if (reg.waiting && reg.active) {
                            newWorker = reg.waiting
                            notifyRef.current.style.display = null
                        } else {
                            reg.addEventListener('updatefound', () => {
                                newWorker = reg.installing;
                                newWorker.addEventListener('statechange', () => {
                                    switch (newWorker.state) {
                                        case 'installed':
                                            if (navigator.serviceWorker.controller) {
                                                notifyRef.current.style.display = null
                                            }
                                            break;
                                    }
                                });
                            })
                        }
                        setSwInited(true)
                        getVersion()
                    })
                    .catch(function(error) {
                        console.log("Fail Register ServiceWorker", error);
                    });
                let refreshing;
                navigator.serviceWorker.addEventListener('controllerchange', function() {
                    if (refreshing) return;
                    window.location.reload();
                    refreshing = true;
                });
            } else {
                console.log("Service Worker Not Supported")
                setSwInited(true)
            }
        }
    }
    useEffect(function() {
        initVersion()
    }, [])
    return (
        <div className={classes.notification} ref={notifyRef} style={{color:"#EEE",display:"none",fontSize:"18px",height:"30px"}}>
            A new version of this app is available. Please Click <Button various="outlined" ref={reloadRef} style={{color:"#EEE"}}>Update</Button> to update.
         </div>
    )
}


export default ServiceWorkerBar
