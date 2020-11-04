import React, { useState, useEffect } from "react";
import "./App.css";
import { corona } from "../src/components/data/data";
import Speech from "speak-tts";

function App() {
	const speech = new Speech();
	speech.init({
		volume: 1,
		lang: "de",
		rate: 0.7,
		pitch: 1,
		splitSentences: true,
	});

	let [addOne, setAddOne] = useState(0);
	const [german, setGerman] = useState(corona[addOne].german);
	const [english, setEnglish] = useState(corona[addOne].english);
	const [disabled, setDisabled] = useState(false);

	const startCount = () => {
		setAddOne(addOne + 1);
	};

	useEffect(() => {
		startCount();
	}, []);

	const listenGerman = () => {
		speech.speak({ text: german });
	};
	const nextWord = () => {
		setAddOne(addOne + 1);
		setGerman(corona[addOne].german);
		setEnglish(corona[addOne].english);
		if (addOne === corona.length - 2) {
			setDisabled({ disabled: true });
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="card bg-dark">
								<h2 className="card-header py-4" onClick={() => listenGerman()}>
									{german}
								</h2>
								<h3 className="card-body text-capitalize">{english}</h3>
							</div>
						</div>
						<div className="col-12">
							<button
								disabled={disabled}
								onClick={() => nextWord(german)}
								type="button"
								className="btn btn-lg btn-danger fixed-bottom btn-block"
							>
								Next word
							</button>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}

export default App;
