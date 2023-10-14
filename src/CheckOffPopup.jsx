export function CheckOffPopup() {
    return (
        <>
            <form>
                <label>Qty</label><input type="number" step=".01" min="0"></input>
                <label>Cost</label><input type="number" step=".01" min="0"></input>
                <button>OK</button>
            </form>
        </>
    )
    
}