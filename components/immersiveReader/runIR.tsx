import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import IRSettings from "./irSetting";

const RunIR = () => {
    const textAreaRef = useRef();
    const t2r =
        "Join learners like you already enrolled. Top-rated course. 30-day guarantee. Shop thousands of high-quality on-demand online courses";

    const [synth, setSynth] = useState<SpeechSynthesis>();
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>();

    // counter to highlight the text being spoken
    const [hlSection, setHlSection] = useState({ from: 0, to: 0 });

    // to show and hide modal
    const [show, setShow] = useState(false);

    // to show and hide settings modal
    const [showIRSetting, setShowIRSetting] = useState(false);

    // to change the font size
    const [currFS, setCurrFS] = useState(6);

    useEffect(() => {
        const newSynth = window.speechSynthesis;

        if (!newSynth) {
            throw new Error("No TTS Capability");
        } else {
            setSynth(newSynth);
        }

        const tmpUttr = new SpeechSynthesisUtterance("Loading...");
        setUtterance(tmpUttr);
    }, []);

    useEffect(() => {
        utterance?.addEventListener("boundary", (event) => {
            const { charIndex, charLength } = event;
            setHlSection({ from: charIndex, to: charIndex + charLength });
        });
    }, [utterance]);

    useEffect(() => {
        if (!show) {
            stopSpeaking();
        }
    }, [show]);

    const handleROL = (e) => {
        e.preventDefault();
        // const t2r = textAreaRef.current?.value;
        // console.log(t2r);
        startPlaying();
    };

    const startPlaying = () => {
        if (utterance) {
            console.log(synth?.paused);

            if (synth?.speaking && synth?.paused) {
                synth.resume();
                return;
            }

            // cancel everything that is been spoken
            synth?.cancel();

            // set a new text
            utterance.text = t2r;

            // start speaking the new text
            synth?.speak(utterance);

            setShow(true);
        }
    };
    const stopSpeaking = () => {
        synth?.cancel();
    };

    const splitText = (text: string, from: number, to: number) => {
        const highlightedText = {
            start: text.slice(0, from),
            hightedtext: text.slice(from, to),
            finish: text.slice(to),
        };

        return highlightedText;
    };

    const highlightedText = splitText(t2r, hlSection.from, hlSection.to);
    // console.log(highlightedText);

    const handlePlay = (e) => {
        e.preventDefault();
        startPlaying();
    };
    const handlePause = (e) => {
        e.preventDefault();
        synth?.pause();
    };
    const handleStop = (e) => {
        e.preventDefault();
        synth?.cancel();
    };
    const handleRestart = (e) => {
        e.preventDefault();
        synth?.cancel();
        startPlaying();
    };

    const handleIRSettings = (e) => {
        e.preventDefault();
        setShowIRSetting(true);
    };

    const cnClass = `container fs-${6 - currFS}`;

    const getModal = (
        <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Listen to a story</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cnClass}>
                    {highlightedText.start}
                    <span className="bg-secondary">
                        {highlightedText.hightedtext}
                    </span>
                    {highlightedText.finish}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    onClick={handleIRSettings}
                    className="btn btn-sm  btn-dark me-3"
                >
                    <i className="bi bi-sliders"></i>
                </button>
                <button
                    type="button"
                    onClick={handlePlay}
                    className="btn btn-dark btn-sm"
                >
                    <i className="bi bi-play-fill"></i>
                </button>
                <button
                    type="button"
                    onClick={handlePause}
                    className="btn btn-dark btn-sm"
                >
                    <i className="bi bi-pause-circle"></i>
                </button>
                <button
                    type="button"
                    onClick={handleStop}
                    className="btn btn-dark btn-sm"
                >
                    <i className="bi bi-stop-circle"></i>
                </button>
                <button
                    type="button"
                    onClick={handleRestart}
                    className="btn btn-dark btn-sm"
                >
                    <i className="bi bi-arrow-clockwise"></i>
                </button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <div>
            <div className="row d-flex justify-content-center my-5">
                <div className="col-md-9 col-11 p-5 broder shadow-lg text-center">
                    <h3 className="mb-3">Immersive Text to Speech</h3>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                        >
                            Paste your text here
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={5}
                            ref={textAreaRef}
                        ></textarea>
                        <button
                            type="button"
                            onClick={handleROL}
                            className="btn btn-dark btn-sm mt-2"
                        >
                            <i className="bi bi-soundwave"> Read Out Loud</i>
                        </button>
                    </div>
                </div>
            </div>
            {getModal}

            <IRSettings
                showIRSetting={showIRSetting}
                setShowIRSetting={setShowIRSetting}
                currFS={currFS}
                setCurrFS={setCurrFS}
            />
        </div>
    );
};

export default RunIR;
