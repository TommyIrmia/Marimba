
export function ColorInput({ onChangeColor }) {

    const colors = ["#a5cbad", "#8e2b23", "#c34914", "#b4b4b4", "#687e7e", "#eec1c9",
        "#ad97c5", "#1bd57f", "#046fbc", "#779dc3", "#80433b", "#96eadc", "#e24aa5"];

    return (
        <section className="color-input flex" >
            {colors.map(color => (
                <article key={color} onClick={() => onChangeColor(color)}
                    style={{ backgroundColor: color }} className="color"></article>
            ))}

        </section>
    )
}