"use strict";

function terima_btn(){
  $("#tablePermintaanPengangkutan").on('click', '#btnTerima', function() {
    var id = $(this).closest("tr").find("td:eq(0)").text();
    swal({
      title: 'Apakah anda yakin?',
      text: 'Proses ini tidak bisa diubah kembali seperti awal',
      icon: 'warning',
      buttons: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let tokenSession = sessionStorage.getItem("token");
        let token = "Bearer" + " " + tokenSession;
        const url = "https://pepeseal.klubaderai.com/api/adminterimaorder/"+id
        $.ajax({
          method: "PUT",
          url: url,
          headers: {
              Authorization: token,
          },
          success: function (response){
              console.log(response)
              swal('Pengangkutan akan dilaksanakan', {
                icon: 'success',
              });
          },
          error: function (response) {
              var hasil = response.responseJSON.message;
              alert(hasil);
          },
      });
      } else {
      swal('Proses dibatalkan');
      }
    });
  })
}

function tolak_btn(){
  $("#tablePermintaanPengangkutan").on('click', '#btnTolak', function() {
    var id = $(this).closest("tr").find("td:eq(0)").text();
    swal({
      title: 'Apakah anda yakin?',
      text: 'Proses ini tidak bisa diubah kembali seperti awal',
      icon: 'warning',
      buttons: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let tokenSession = sessionStorage.getItem("token");
        let token = "Bearer" + " " + tokenSession;
        const url = "https://pepeseal.klubaderai.com/api/admintolakorder/"+id
        $.ajax({
          method: "PUT",
          url: url,
          headers: {
              Authorization: token,
          },
          success: function (response){
              console.log(response)
              swal('Penolakan Berhasil', {
                icon: 'success',
              });
          },
          error: function (response) {
              var hasil = response.responseJSON.message;
              alert(hasil);
          },
      });
      } else {
      swal('Proses dibatalkan');
      }
    });
  })
};


function tablePermintaanPengangkutan() {
  let tokenSession = sessionStorage.getItem("token");
  let token = "Bearer" + " " + tokenSession;
  const url = "https://pepeseal.klubaderai.com/api/viewpengangkutanadmin"
  $(document).ready(function () {
      $.ajax({
          method: "GET",
          url: url,
          headers: {
              Authorization: token,
          },
          success: function (response) {
              var dataAPI = response.pengangkutan;
              console.log(dataAPI);
              dataAPI = dataAPI.filter(dataAPI => dataAPI.status.status == "Pending" || dataAPI.status.status == "reschedule_pending")
              $("#tablePermintaanPengangkutan").DataTable({
                  data: dataAPI,
                  responsive: true,
                  pageLength: 10,
                  autoWidth: false,
                  order: [[0, "desc"]],
                  columnDefs: [
                    {
                      targets:[5],
                      render: function(){
                          const btnTerima = '<button class="btn btn-success mx-1" id="btnTerima" onclick="terima_btn()">Terima</button>'
                          const btnTolak = '<button class="btn btn-danger mx-1" id="btnTolak" onclick="tolak_btn()">Tolak</button>'   
                          return btnTolak + btnTerima
                      }
                    },],
                  columns: [
                      {
                          data: "id",
                      },
                      {
                          data: "user",
                          render: {_: "name"}
                      },
                      {
                          data: "user",
                          render: {_:"Alamat"}
                      },
                      {
                          data: "Tanggal_angkut",
                          orderable: false,
                      },
                      {
                          data: "jam_angkut",
                          orderable: false,
                      },{
                          width: "9rem"
                      },
                  ],
              },);
          },
          error: function (response) {
              var hasil = response.responseJSON.message;
              alert(hasil);
          },
      });
  });
}