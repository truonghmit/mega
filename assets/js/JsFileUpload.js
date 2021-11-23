var ObjNhanVien;
var ObjNhanVienIn=[];
var ObjNhanVienSelect=[];
var ExcelToJSON = function() {

    this.parseExcel = function(file) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
  
        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          var json_object = JSON.stringify(XL_row_object); 
          ObjNhanVien = json_object;
          FillData(json_object);
          ObjNhanVienIn = JSON.parse(json_object);
          console.log(json_object);
          
        })
  
      };
  
      reader.onerror = function(ex) {
        console.log(ex);
      };
  
      reader.readAsBinaryString(file);
    };
}; 
function FillData(datas) {
    Tables.tableInSetData(JSON.parse(datas));
    // $('#DataNhanVien').dataTable({
    //   data: JSON.parse(datas),
    //   columns: [ 
    //     { 'data':  'STT' },
    //     { 'data': 'MaNV' },
    //     { 'data': 'HOVATEN' },
    //     { 'data': 'CHUCDANHCAONHAT' },
    //     { 'data': 'KHOIHO' },
    //     { 'data': 'TTHO/VUNGKPP' },
    //     { 'data': 'PHONGHO/CHINHANHKPP' },
    //     { 'data': 'BOPHANHO/TTKDKPP' },
    //     { 'data': 'Email' }, 
    //     ]
    // });
  }; 
  
function FillDatasssss(datas) {
    $('#DataNhanVien').dataTable({
      data: datas,
      columns: [
        { 'data': 'STT' },
        { 'data': 'Mã NV' },
        { 'data': 'HỌ VÀ TÊN' },
        { 'data': 'CHỨC DANH CAO NHẤT' },
        { 'data': 'KHỐI HO' },
        { 'data': 'TT HO/VÙNG KPP' },
        { 'data': 'PHÒNG HO/CHI NHÁNH KPP' },
        { 'data': 'TT HO/VÙNG KPP' },
        { 'data': 'BỘ PHẬN H.O/TTKD KPP' },
        { 'data': 'Email' }, 
        ]
    });
  }; 
var Tables={
    tableIn : null,
    tableOut : null,
    init:function(){
        Tables.tableIn = $('#DataNhanVien').dataTable({ 
            data:[],
            columns: [ 
              { 'data':  'STT' },
              { 'data': 'MaNV' },
              { 'data': 'HOVATEN' },
              { 'data': 'CHUCDANHCAONHAT' },
              { 'data': 'KHOIHO' },
              { 'data': 'TTHO/VUNGKPP' },
              { 'data': 'PHONGHO/CHINHANHKPP' },
              { 'data': 'BOPHANHO/TTKDKPP' },
              { 'data': 'Email' }, 
              ]
        });
        Tables.tableOut =  $('#DataNhanVienDuocChon').dataTable({ 
            data:[],
            columns: [ 
              { 'data':  'STT' },
              { 'data': 'MaNV' },
              { 'data': 'HOVATEN' },
              { 'data': 'CHUCDANHCAONHAT' },
              { 'data': 'KHOIHO' },
              { 'data': 'TTHO/VUNGKPP' },
              { 'data': 'PHONGHO/CHINHANHKPP' },
              { 'data': 'BOPHANHO/TTKDKPP' },
              { 'data': 'Email' }, 
              ],
              dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
          });
    },
    tableInSetData:function(data){
        $('#DataNhanVien').DataTable().rows.add(data).draw();
       
    },
    tableOutReload:function(data){ 
        $('#DataNhanVienDuocChon').DataTable().clear();
        $('#DataNhanVienDuocChon').DataTable().rows.add(data).draw();
        
         
    },
    
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
  

$(document).ready(function() {
    $('#NumberRanShow').attr("hidden", true);
    $('#NumberRan').attr("hidden", false);
    $('#start').attr("hidden", false);
    $('#Find').attr("hidden", true);

    $('#fileUpload').change(function(evt) {  
        var files = evt.target.files; 
        var xl2json = new ExcelToJSON();
        xl2json.parseExcel(files[0]); 
    });
    Tables.init();
    
    $('#Find').click(function(){ 
        if(ObjNhanVien!=null && ObjNhanVien.length>1){  
            $('#NumberRanShow').attr("hidden", true);
            $('#NumberRan').attr("hidden", false);
            $('#start').attr("hidden", false);
            $('#Find').attr("hidden", true);
            var result = ObjNhanVienIn[Math.floor(Math.random()*ObjNhanVienIn.length)];
            const index = ObjNhanVienIn.indexOf(result);
            $('#NumberRan').html(pad(Number(result.STT))) 
            var NameOut = result.STT + ' - ' + result.MaNV + ' - '+ result.HOVATEN;
            $('#NameOut').html(NameOut);


            ObjNhanVienIn.splice(index, 1); 
            result.STT = ObjNhanVienSelect.length +1;
            ObjNhanVienSelect.push(result);
          
            console.log(' - '+result); 
        }
        else{
            alert("Chưa có thông tin Học Viên!");
        }
        Tables.tableOutReload(ObjNhanVienSelect);
        
    })

    $('#start').click(function(){  
        $('#NameOut').html('');
        if(ObjNhanVien!=null && ObjNhanVien.length>1){ 
             $('#NumberRanShow').attr("hidden", false);
             $('#NumberRan').attr("hidden", true);
             $('#start').attr("hidden", true);
             $('#Find').attr("hidden", false);
            } 
        else{
            alert("Chưa có thông tin Học Viên!");
        }
    });
     
    setInterval(function(){
        const rndInt = randomIntFromInterval(1, 50); 
        $('#NumberRanShow').html(pad(rndInt)) 
    },100)  
});
