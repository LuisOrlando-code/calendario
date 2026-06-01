var GrupoTransicionCSS = React.addons.CSSTransitionGroup;

const meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


var direccion, inicioX, inicioY, tiempoInicio, desplazamientoX, desplazamientoY, tiempoTranscurrido;
const duracionSwipe = 100;
const desplazamientoMinimoSwipe = 100;
const restriccionSwipe = 200;

const diasSemana = ["", "dom", "lun", "mar", "mie", "jue", "vie", "sab"];


const TituloMesAno = (props) =>
    React.createElement("div", { className: "contenedorTituloMesAno" },
        React.createElement("div", { className: "envolturaMes" }, props.mes),
        React.createElement("div", { className: "envolturAno" }, props.ano));

const TituloDiasSemana = () =>
    React.createElement("div", { className: "contenedorTituloDiasSemana" },
        React.createElement("div", { className: "envolturaSemana" }, "Dom"),
        React.createElement("div", { className: "envolturaSemana" }, "Lun"),
        React.createElement("div", { className: "envolturaSemana" }, "Mar"),
        React.createElement("div", { className: "envolturaSemana" }, "Mié"),
        React.createElement("div", { className: "envolturaSemana" }, "Jue"),
        React.createElement("div", { className: "envolturaSemana" }, "Vie"),
        React.createElement("div", { className: "envolturaSemana" }, "Sáb"));

class CeldasDia extends React.Component {
    calcularCeldasDia(mes, ano) {
        let numeroDias = new Date(ano, mes, 0).getDate();
        
        let primerDia = new Date(ano, mes - 1, 1).getDay();

        
        let filas = [];
        let i = 0;

        while (i++ < primerDia) {
            filas.push({
                key: `vacio${i}${mes}${ano}`,
                className: "celda-vacia",
                numeroDia: ""
            });
        }

        let dia = 1;
        while (dia <= numeroDias) {
            
            var ordenFlex = dia % 7 === 0 ? diasSemana[7] : diasSemana[dia % 7];
            const nombreEstilo = `celda ${ordenFlex}`;
            const id = `${dia}${mes}${ano}`;
            filas.push({
                key: id,
                className: nombreEstilo,
                numeroDia: dia++
            });
        }

        return filas;
    }

    componentWillReceiveProps(siguientesProps) {
        if (this.props.mes !== siguientesProps.mes) {
            console.log("Mes cambiado:");
        }
    }

    manejarClicDia(id) {
        if (id[0] !== 'v') {
            this.props.alClickearDia(id);
        }
    }

    render() {
       
        const { mes, ano, diaClickeado } = this.props;
        var arregloMesActual = this.calcularCeldasDia(mes, ano);

        const arr = [];
        const renderizarCalendario = diaClickeado => {
            arregloMesActual.map(item => {
                var estilo = item.key === diaClickeado && item.key[0] !== "v" ?
                    "numeroDia seleccionado" : "numeroDia";
                arr.push(
                    React.createElement("div", {
                        key: item.key,
                        className: item.className,
                       
                        onClick: () => { this.manejarClicDia(item.key); },
                        onTouchStart: () => { this.manejarClicDia(item.key); }
                    },
                        React.createElement("span", { className: estilo }, item.numeroDia))
                );
            });
            return React.createElement("div", { className: "contenedorCeldasDia" }, arr);
        };
        return (
            React.createElement("div", { className: "envolturCalendario" },
                renderizarCalendario(diaClickeado))
        );
    }
}

class ControlesMes extends React.Component {
    manejarClicFlecha(dir) {
        this.props.alClickearFlecha(dir);
    }
    render() {
        const { dir } = this.props;
        return React.createElement("div", { className: "envolturaFlecha" },
            React.createElement("div", {
                className: `flecha ${dir}`,
                onClick: () => { this.manejarClicFlecha(dir); }
            }));
    }
}

class Calendario extends React.Component {
    constructor(props) {
        super(props);
        let hoy = new Date();
        let diaDefecto = hoy.getDate();
        let mesDefecto = hoy.getMonth() + 1;
        let anoDefecto = hoy.getFullYear();
        let diaClickeadoDefecto = `${diaDefecto}${mesDefecto}${anoDefecto}`;
        this.state = {
            mes: mesDefecto,
            ano: anoDefecto,
            
            diaClickeado: diaClickeadoDefecto,
            mesAnterior: undefined
        };

        this.manejarDiaClickeado = this.manejarDiaClickeado.bind(this);
        this.manejarCambioMes = this.manejarCambioMes.bind(this);
    }

    manejarDiaClickeado(id) {
        this.setState({
            diaClickeado: id
        });
    }

    manejarCambioMes(dir) {
        const { mes, ano } = this.state;
        if (dir === "izquierda") {
            if (mes === 1) {
                this.setState({ ano: ano - 1, mes: 12, mesAnterior: 1 });
            } else {
                this.setState({ mes: mes - 1, mesAnterior: mes });
            }
        }
        if (dir === "derecha") {
            if (mes === 12) {
                this.setState({ ano: ano + 1, mes: 1, mesAnterior: 12 });
            } else {
                this.setState({ mes: mes + 1, mesAnterior: mes });
            }
        }
    }

    manejarEventoSwipe(e, accion) {
        const objetoEventoToque = e.changedTouches[0];
        if (accion === "inicio") {
            inicioX = objetoEventoToque.screenX;
            inicioY = objetoEventoToque.screenY;
            tiempoInicio = new Date().getTime();
        } else if (accion === "fin") {
            tiempoTranscurrido = new Date().getTime() - tiempoInicio;
            if (tiempoTranscurrido >= duracionSwipe) {
                if (Math.abs(desplazamientoX) >= desplazamientoMinimoSwipe &&
                    Math.abs(desplazamientoY) <= restriccionSwipe) {
                    this.manejarCambioMes(direccion);
                }
                desplazamientoX = 0;
                desplazamientoY = 0;
            }
        } else {
            desplazamientoX = objetoEventoToque.screenX - inicioX;
            desplazamientoY = objetoEventoToque.screenY - inicioY;
            if (Math.abs(desplazamientoX) > Math.abs(desplazamientoY)) {
               
                direccion = desplazamientoX < 0 ? "derecha" : "izquierda";
            }
        }
    }

    componentDidMount() {
        document.addEventListener("touchstart", function () { }, true);
    }

    render() {
        const { mes, ano, diaClickeado, mesAnterior } = this.state;

       
        function calcularTransicion(mesAnterior, mes) {
            if (mesAnterior === undefined) return "carruselInc";
            if (mes === 1 && mesAnterior === 12) {
                return "carruselInc";
            } else if (mes === 12 && mesAnterior === 1) {
                return "carruselDec";
            } else if (mes > mesAnterior) {
                return "carruselInc";
            } else {
                return "carruselDec";
            }
        }

        const estiloTransicion = calcularTransicion(mesAnterior, mes);

        return (
            React.createElement("div", { className: "contenedorCalendario" },
                
                React.createElement(TituloMesAno, { mes: meses[mes], ano: ano }),
                React.createElement(TituloDiasSemana, null),
                React.createElement("div", {
                    className: "visorCeldasDia",
                    onTouchStart: e => this.manejarEventoSwipe(e, "inicio"),
                    
                    onTouchMove: e => this.manejarEventoSwipe(e, "movimiento"),
                    onTouchEnd: e => this.manejarEventoSwipe(e, "fin")
                },
                    React.createElement("div", { className: "envolturaCeldasDia" },
                        React.createElement(GrupoTransicionCSS, {
                            className: "desplazamientoAnimado",
                            transitionName: `${estiloTransicion}`,
                            transitionEnterTimeout: 300,
                            
                            transitionLeaveTimeout: 300
                        },
                           
                            React.createElement(CeldasDia, {
                                key: `${mes}${ano}`,
                                mes: mes,
                                ano: ano,
                                diaClickeado: diaClickeado,
                                alClickearDia: this.manejarDiaClickeado
                            })))),
                React.createElement(ControlesMes, { dir: "izquierda", alClickearFlecha: this.manejarCambioMes }),
               
                React.createElement(ControlesMes, { dir: "derecha", alClickearFlecha: this.manejarCambioMes }))
        );
    }
}

ReactDOM.render(
    React.createElement("div", null, React.createElement(Calendario, null)),
    document.getElementById('app')
);