
export function ColorInput({ onChangeColor }) {

    const colors = ["#b4b4b4", "#a5cbad", "#1bd57f", "#96eadc", "#046fbc", "#779dc3", "#ad97c5", "#eec1c9",
        "#e24aa5", "#c34914", "#e76f51", "#e9c46a", "#f4a261", "#cb997e", "#ddbea9", "#687e7e"];

    return (
        <section className="color-input flex" >
            {colors.map(color => (
                <article key={color} onClick={() => onChangeColor(color)}
                    style={{ backgroundColor: color }} className="color"></article>
            ))}
        </section>
    )
}