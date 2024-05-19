import { Component, OnInit } from '@angular/core';
import { EmpresaService } from './../../services/empresa.service';
import { Empresa } from 'src/app/models/Empresa';
import Swal from 'sweetalert2';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { environment } from 'src/environments/environment';
import { fotos_empresas } from 'src/app/models/lista_fotos';

declare var $: any;

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.css']
})

export class EmpresaComponent implements OnInit {
    empresas: Empresa[] = [];
    empresa: Empresa = new Empresa();
    empresaNueva: Empresa = new Empresa();
    pageSize = 10;
    p = 1;
    idioma: any = '1';
    liga = '';
    imgEmpresa: any;
    fileToUpload: any;
    imagenActualizada = false;
    imagenUrls: { [id: number]: string } = {};
    insertedID: any;
    lista_fotos: fotos_empresas[] = [];
    onePicture: any;
    fileToUpload2: any;

    constructor(private imagenesService: ImagenesService, private empresaService: EmpresaService, private cambioIdiomaService: CambioIdiomaService) {
        this.liga = environment.API_URI_IMAGES;
        this.idioma = localStorage.getItem("idioma");

        console.log("idioma", this.idioma)
        this.cambioIdiomaService.currentMsg$.subscribe(
            (msg) => {
                if (msg != '') {
                    this.idioma = msg;
                }
                console.log("idioma actual:", this.idioma, " aaaa");
                if (this.idioma !== '2') {
                    console.log("idioma actual:", this.idioma);
                    this.inicializarCalendarioES();
                }
                else if (this.idioma === '2') {
                    console.log("idioma actual:", this.idioma);
                    this.inicializarCalendarioEN();
                }
            });


    }

    inicializarCalendarioEN(): void {
        $('.datepicker').val('');
        $(document).ready(function () {
            $('.datepicker').datepicker({
                format: 'dd/mm/yyyy'
            });
        });

    }

    inicializarCalendarioES(): void {
        $('.datepicker').val('');
        $(document).ready(function () {
            $('.datepicker').datepicker({
                format: 'dd/mm/yyyy', // Formato de fecha
                i18n: {
                    cancel: 'Cancelar',
                    clear: 'Limpiar',
                    done: 'Listo',
                    previousMonth: '‹',
                    nextMonth: '›',
                    months: [
                        'Enero',
                        'Febrero',
                        'Marzo',
                        'Abril',
                        'Mayo',
                        'Junio',
                        'Julio',
                        'Agosto',
                        'Septiembre',
                        'Octubre',
                        'Noviembre',
                        'Diciembre'
                    ],
                    monthsShort: [
                        'Ene',
                        'Feb',
                        'Mar',
                        'Abr',
                        'May',
                        'Jun',
                        'Jul',
                        'Ago',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dic'
                    ],
                    weekdays: [
                        'Domingo',
                        'Lunes',
                        'Martes',
                        'Miércoles',
                        'Jueves',
                        'Viernes',
                        'Sábado'
                    ],
                    weekdaysShort: [
                        'Dom',
                        'Lun',
                        'Mar',
                        'Mié',
                        'Jue',
                        'Vie',
                        'Sáb'
                    ],
                    weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
                }
            });
        });

    }
    nuevaFecha(date?: any) {
        console.log("fehcaaaaaa:", date);
        if (date) {
            this.empresaNueva.fecha = date;
        }
    }
    ngOnInit(): void {
        this.empresaService.list().subscribe((resEmpresas: any) => {
            this.empresas = resEmpresas;
        }, err => console.error(err));
    }
    actualizarEmpresa(id_empresa: any) {
        this.empresaService.listOne(id_empresa).subscribe((resEmpresa: any) => {
            this.empresa = resEmpresa;
            console.log(this.empresa)
            $('#modalModificarEmpresa').modal();
            $("#modalModificarEmpresa").modal("open");
        }, err => console.error(err));
    }
    guardarActualizarEmpresa() {
        console.log("Guardar empresa");
        if (!this.empresa.descripcion || !this.empresa.description || !this.empresa.direccion || !this.empresa.nombre_empresa || !this.empresa.rfc || !this.empresa.telefono || !this.empresa.fecha) {
            if (this.idioma == '1') {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Por favor rellene todos los campos'
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Please fill all inputs'
                });
            }
        } else {
            this.empresaService.actualizarEmpresa(this.empresa).subscribe((res) => {
                $('#modalModificarEmpresa').modal('close');
                this.empresaService.list().subscribe((resEmpresas: any) => {
                    this.empresas = resEmpresas;
                }, err => console.error(err));
                if (this.idioma == '1') {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Empresa Actualizada'
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Updated company'
                    });
                }
            },
                error => {
                    if (this.idioma == '1') {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un problema al actualizar la empresa',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'There was a problem updating the company',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    }
                });
        }
    }


    crearEmpresa() {
        this.empresaNueva = new Empresa();
        console.log("empresa nueva")
        $('#modalCrearEmpresa').modal();
        $("#modalCrearEmpresa").modal("open");
    }


    guardarNuevaEmpresa() {
        console.log("Nueva empresa guardando");

        if (!this.empresaNueva.descripcion || !this.empresaNueva.description || !this.empresaNueva.direccion || !this.empresaNueva.nombre_empresa || !this.empresaNueva.rfc || !this.empresaNueva.telefono || !this.empresaNueva.fecha) {
            if (this.idioma == '1') {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Por favor rellene todos los campos'
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Please fill all inputs'
                });
            }
        } else {
            //console.log("Formulario valido");
            this.empresaService.crearEmpresa(this.empresaNueva).subscribe((res) => {
                $('#modalCrearEmpresa').modal('close');
                this.empresaService.list().subscribe((resEmpresas: any) => {
                    this.empresas = resEmpresas;
                    if (this.fileToUpload != null) {
                        let a = this.empresas.length;
                        a = a - 1;
                        let prueba = this.empresas[a];
                        this.empresa = prueba;
                        this.guardandoImagen();
                    }

                }, err => console.error(err));
                if (this.idioma == '1') {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Empresa creada'
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Created company'
                    });
                }

            }, error => {
                if (this.idioma == '1') {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al crear la empresa',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'There was a problem creating the company',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    }

    eliminarEmpresa(id_empresa: any) {
        if (this.idioma == '2') {
            Swal.fire({
                title: "Are you sure you want to delete this company?",
                text: "This action cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, I want to delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.empresaService.eliminarEmpresa(id_empresa).subscribe((resEmpresa: any) => {
                        console.log("resEmpresa: ", resEmpresa);
                        this.empresaService.list().subscribe((resEmpresa: any) => {
                            this.empresas = resEmpresa;
                            //console.log(resEmpresa);
                            console.log(this.empresas)
                        },
                            err => console.error(err)
                        );
                    }, err => {
                        Swal.fire({
                            title: 'Error',
                            text: 'There was a problem deleting the company',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    });


                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        } else {
            console.log("Click en eliminar Empresa");
            console.log("Identificador del Empresa: ", id_empresa);
            Swal.fire({
                title: "¿Estás seguro de eliminar esta empresa?",
                text: "¡No es posible revertir esta acción!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, quiero eliminarlo!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.empresaService.eliminarEmpresa(id_empresa).subscribe((resEmpresa: any) => {
                        console.log("resEmpresa: ", resEmpresa);
                        this.empresaService.list().subscribe((resEmpresa: any) => {
                            this.empresas = resEmpresa;
                            //console.log(resEmpresa);
                            console.log(this.empresas)
                        },
                            err => console.error(err)
                        );
                    },
                        err => {
                            Swal.fire({
                                title: 'Error',
                                text: 'Hubo un problema al elimnar la empresa',
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        });


                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "Tu archivo ha sido eliminado.",
                        icon: "success"
                    });
                }
            });
        }

    }

    initDatepicker(fecha?: any) {
        let date = "2024-07-26";
        //if(fecha){
        //date = new Date(fecha += 'T00:00:00');
        $('#fechaEmpresa').datepicker({
            format: "yyyy-mm-dd",
            defaultDate: date,
        });
        //}
    }

    actualizarFecha(date?: any) {
        if (date) {
            this.empresa.fecha = date;
        }
    }
    mostrarImagen(id_empresa: any) {
        this.imgEmpresa = null;
        this.fileToUpload = null;
        this.empresaService.listOne(id_empresa).subscribe((resEmpresa: any) => {
            this.empresa = resEmpresa;
            console.log("Empresa con ID: ", this.empresa.id_empresa);
            $('#Imagen').modal();
            $("#Imagen").modal("open");
        }, err => console.error(err));
    }

    mostrarImagenes(id_empresa: any) {
        this.imgEmpresa = null;
        this.fileToUpload = null;
        this.empresaService.listOne(id_empresa).subscribe((resEmpresa: any) => {
            this.empresa = resEmpresa;
            this.mostrar_todas_fotos(this.empresa.id_empresa);
            console.log("Empresa con ID: ", this.empresa.id_empresa);
            $('#Imagenes').modal();
            $("#Imagenes").modal("open");
        }, err => console.error(err));
    }

    cargandoImagen(archivo: any) {
        //this.usuario.fotito = 0;
        this.imgEmpresa = null;
        this.fileToUpload = null;
        this.fileToUpload = archivo.files.item(0);
        console.log("convirtiendo imagen");
    }

    cargando_coleccion_imagenes(archivo: any) {
        this.imgEmpresa = null;
        this.liga = environment.API_URI_IMAGES;

        for (let i = 0; i < archivo.files.length; i++) {
            console.log("Enviando foto numero: ", i);
            this.fileToUpload2 = archivo.files.item(i);
            let imgPromise = this.getFileBlob(this.fileToUpload2);
            imgPromise.then(blob => {
                console.log("convirtiendo imagen")

                const id = {
                    id: this.empresa.id_empresa
                }

                this.empresaService.inserta_datos_foto(id).subscribe((resDatos: any) => {
                    
                    console.log(resDatos);
                    this.insertedID = resDatos.insertId;
                    console.log("Tupla ", this.insertedID);
                    this.imagenesService.guardarImagen(this.insertedID, "fotos_empresas", blob).subscribe(
                        (res: any) => {
                            this.imgEmpresa = blob;
                            this.empresaService.list().subscribe((resEmpresas: any) => {
                                this.empresas = resEmpresas;
                            }, err => console.error(err));
                        },
                        err => console.error(err));
                });
            });
        }
    }

    guardar_cambios() {

        Swal.fire({
            title: 'Imagenes guardadas.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });

        this.empresaService.list().subscribe((resEmpresas: any) => {
            this.empresas = resEmpresas;
        });
    }

    mostrar_todas_fotos(id: any) {
        console.log("FUNCIONNNNNN MOSTRAR FOTOOOOOOOOOOOOOOOOOOOOOOS");
        
        this.lista_fotos = [];
        this.empresaService.id_fotos_por_empresa(id).subscribe((resLista: any) => {
            this.lista_fotos = resLista;
            console.log("se cargaron la lista de fotos: ", this.lista_fotos);
        }, err => console.error(err));
    }

    actualizarIndicadores() {
        // Obtener el número de imágenes en el carrusel
        var numImagenes = $('.carousel.carousel-slider .carousel-item').length;

        // Actualizar el número de indicadores
        $('.carousel.carousel-slider .indicators').empty(); // Vaciar los indicadores existentes
        for (var i = 0; i < numImagenes; i++) {
            $('.carousel.carousel-slider .indicators').append('<li></li>'); // Agregar un indicador por cada imagen
        }
    }


    getFileBlob(file: any) {
        var reader = new FileReader();
        return new Promise(function (resolve, reject) { //Espera a que se cargue la img
            reader.onload = (function (thefile) {
                return function (e) {
                    // console.log(e.target?.result)
                    resolve(e.target?.result);
                };

            })(file);
            reader.readAsDataURL(file);
        });

    }

    guardandoImagen() {
        if (!this.fileToUpload || this.fileToUpload.size === 0) {
            const errorMessage = (this.idioma === '1') ? "No has seleccionado ninguna imagen" : "You have not selected any image";

            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error"
            });
            return;
        }

        console.log(this.empresa.id_empresa);
        const imgPromise = this.getFileBlob(this.fileToUpload);
        imgPromise.then(blob => {
            this.imagenesService.guardarImagen(this.empresa.id_empresa, "empresas", blob).subscribe(
                (res: any) => {
                    this.imgEmpresa = blob;
                    console.log("empresa id: ", this.empresa.id_empresa);
                },
                err => console.error(err));

            if (this.fileToUpload != null || this.imgEmpresa != null) {
                this.imagenActualizada = true;
                this.empresaService.actualizarFotito(this.empresa).subscribe((resempresa: any) => {
                    console.log("fotito: ", resempresa);
                }, err => console.error(err));
            }
        });

        if (this.idioma === '2') {
            Swal.fire({
                title: "Updated",
                text: "Your image has been updated",
                icon: "success",
                didClose: () => { window.location.reload(); }
            });
        } else {
            Swal.fire({
                title: "Actualizado",
                text: "Tu imagen se ha actualizado",
                icon: "success",
                didClose: () => { window.location.reload(); }
            });
        }
    }

    validateRFC(): boolean {
        const rfc = this.empresa.rfc;
        return /^[A-Za-z0-9]{12}$/.test(rfc);
    }

    validateNewRFC(): boolean {
        const rfc = this.empresaNueva.rfc;
        return /^[A-Za-z0-9]{12}$/.test(rfc);
    }

    validateTelefono(): boolean {
        const telefono = this.empresa.telefono;
        return /^\d{10}$/.test(telefono) && /^\d+$/.test(telefono);
    }

    validateNewTelefono(): boolean {
        const telefono = this.empresaNueva.telefono;
        return /^\d{10}$/.test(telefono) && /^\d+$/.test(telefono);
    }

}