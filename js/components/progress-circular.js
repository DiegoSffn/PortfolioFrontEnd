class ProgressCircular extends HTMLElement{
attrs = {
    color: '#000',
    stroke: '20',
    value: '0',
    width: '150'
}

constructor(){
    super(); 
    this.attachShadow({ mode: 'open'});
}

connectedCallback(){
    this.getAttributes();
    this.style();
    this.render();
}

getAttributes(){
    Array.from(this.attributes).map(a =>{
        this.attrs[a.name] = a.value;
    })
}

style(){
    this.shadowRoot.innerHTML = `
    <style>
    @keyframes rellenar{
        to{
            stroke-dasharray: ${ this.attrs.value } 100;
        }
    }
    div{
        position: relative;
        width: ${ this.attrs.width }px;
    }
    div span{
        position: absolute;
        top: 5%;
        bottom: -5%;
        left: 0%;
        right: 0%;
        display: flex;
        align-items: center;
        justify-content: center;
        font: 15px/1em Verdana;
    }
    .span2{
        position: absolute;
        top: -7%;
        bottom: 7%;
        left: 0%;
        right: 0%;
        display: flex;
        align-items: center;
        justify-content: center;
        font: 15px/1em Verdana;
    }
    circle{
        fill: none;
        stroke-width: ${ this.attrs.stroke };
        stroke-dasharray: 100 100;      
        transform: rotate(-90deg);
        transform-origin: 50%;
        stroke: #AAA;
    }
    circle:nth-child(2){
        stroke: ${ this.attrs.color };
        stroke-dasharray: 0 100;
        animation: rellenar .35s linear forwards;
    }
</style>
`;
}

render(){
    this.shadowRoot.innerHTML += `
    <div>
        <svg width="${this.attrs.width}" height="${this.attrs.width}">
            <circle r="${ (  this.attrs.width - this.attrs.stroke) /2 }"
            cx="50%" cy="50%" pathlength="100" />
            <circle r="${ (  this.attrs.width - this.attrs.stroke) /2 }"
            cx="50%" cy="50%" pathlength="100" />
        </svg>
        <span>${this.attrs.value}%</span>
        <span class="span2">${this.attrs.id}</span>
    </div>
    `
}

}

customElements.define('progress-circular', ProgressCircular);