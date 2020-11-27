import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productos: any;
  producto: any;
  titulo = 'Crear';
  accion = 'Registrar';
  productoModel:Producto = new Producto();
  
  constructor(private productoService: ProductoService, private router: Router) { }
  ngOnInit(): void {
    alert("sasas");
    this.productoModel.idproducto=0;
    this.listar();
  }
  
  delProducto(num: number): void {
    swal.fire({
      title: 'Estas seguro?',
      text: "No podras reverti esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(num).subscribe(
          response => {
            this.listar()
            swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success')
          })
      }
    })
  }
  listar(): void {
    alert("asas");
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data[0]['cursor_productos'];
        console.log("Productos", this.productos);
      }, (err) => {
        console.log("Error en el listar-producto-component")
      }
    )
  }
  delLogica(num: number): void {
    swal.fire({
      title: 'Estas seguro?',
      text: "No podras reverti esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.updateLogica(num).subscribe(
          response => {
            this.listar()
            swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success')
          })
      }
    })
  }
  public create(): void {
    if(this.productoModel.idproducto==0){
    this.productoService.addProducto(this.productoModel).subscribe(
      response => {
        this.listar();
        swal.fire('Nuevo Producto', `Producto ${this.productoModel.nomprod , this.productoModel.precio , this.productoModel.stock} creado con exito`, "success")
        this.productoModel.nomprod= '';
        this.productoModel.precio='' ;
        this.productoModel.stock='';
      })
    }else{
      this.productoService.updateProducto(this.productoModel).subscribe(
        response=>{
          swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.productoModel.idproducto=0;
              this.titulo = 'Crear'
              this.accion = 'Registrar';
              this.listar();
              swal.fire(
                'Actualizado!',
                'El registro ha sido Modificado.',
                'success'
              )
              this.productoModel.nomprod= '' ;
              this.productoModel.precio='' ;
              this.productoModel.stock='';
            }
          })    
      })
    }    
  }
  cargarProducto(num:number):void{
      if(num){
        this.titulo = 'Update'; 
        this.accion = 'Modificar';
        this.productoService.getProducto(num).subscribe(
          (data)=>{
          this.producto=data['cursor_productos'] 
          this.productoModel.idproducto=this.producto[0].IDPRODUCTO;
 this.productoModel.nomprod=this.producto[0].NOMPROD;
this.productoModel.precio=this.producto[0].PRECIO;
 this.productoModel.stock=this.producto[0].STOCK;
         
          
  
        })
      }
  }
}