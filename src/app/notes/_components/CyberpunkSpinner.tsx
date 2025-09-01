import { ReactElement } from "react";

export default function CyberpunkSpinner(): ReactElement {
    return (
        <div className="cyberpunk-loader">
            <div className="cyberpunk-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-text">LOADING...</div>
            </div>
        </div>
    );
}