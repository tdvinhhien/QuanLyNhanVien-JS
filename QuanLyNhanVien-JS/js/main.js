let danhSachNhanVien = [];
let indexCapNhat = -1;

function NhanVien(tk, ten, email, matKhau, ngay, luongCB, chucVu, gioLam) {
  this.taiKhoan = tk;
  this.hoTen = ten;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngay;
  this.luongCoBan = +luongCB;
  this.chucVu = chucVu;
  this.gioLam = +gioLam;

  this.tinhTongLuong = function () {
    if (this.chucVu === "Sếp") return this.luongCoBan * 3;
    if (this.chucVu === "Trưởng phòng") return this.luongCoBan * 2;
    return this.luongCoBan;
  };

  this.xepLoai = function () {
    if (this.gioLam >= 192) return "Xuất sắc";
    if (this.gioLam >= 176) return "Giỏi";
    if (this.gioLam >= 160) return "Khá";
    return "Trung bình";
  };
}

function getEle(id) {
  return document.getElementById(id);
}

function renderTable(list) {
  const tbody = getEle("tableDanhSach");
  tbody.innerHTML = "";
  list.forEach((nv, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tinhTongLuong()}</td>
        <td>${nv.xepLoai()}</td>
        <td>
          <button class="btn btn-danger" onclick="xoaNV(${index})">Xóa</button>
          <button class="btn btn-info" onclick="suaNV(${index})" data-toggle="modal" data-target="#myModal">Sửa</button>
        </td>
      </tr>`;
  });
}

function layThongTinTuForm() {
  const tk = getEle("tknv").value.trim();
  const ten = getEle("name").value.trim();
  const email = getEle("email").value.trim();
  const mk = getEle("password").value;
  const ngay = getEle("datepicker").value;
  const luongCB = getEle("luongCB").value;
  const chucVu = getEle("chucvu").value;
  const gioLam = getEle("gioLam").value;

  if (!validateForm(tk, ten, email, mk, ngay, luongCB, chucVu, gioLam)) return null;
  return new NhanVien(tk, ten, email, mk, ngay, luongCB, chucVu, gioLam);
}

getEle("btnThemNV").onclick = () => {
  const nv = layThongTinTuForm();
  if (!nv) return;
  danhSachNhanVien.push(nv);
  renderTable(danhSachNhanVien);
  resetForm();
};

function suaNV(index) {
  indexCapNhat = index;
  const nv = danhSachNhanVien[index];
  getEle("tknv").value = nv.taiKhoan;
  getEle("tknv").disabled = true;
  getEle("name").value = nv.hoTen;
  getEle("email").value = nv.email;
  getEle("password").value = nv.matKhau;
  getEle("datepicker").value = nv.ngayLam;
  getEle("luongCB").value = nv.luongCoBan;
  getEle("chucvu").value = nv.chucVu;
  getEle("gioLam").value = nv.gioLam;
}

getEle("btnCapNhat").onclick = () => {
  if (indexCapNhat === -1) return;
  const nv = layThongTinTuForm();
  if (!nv) return;
  danhSachNhanVien[indexCapNhat] = nv;
  renderTable(danhSachNhanVien);
  resetForm();
};

function xoaNV(index) {
  danhSachNhanVien.splice(index, 1);
  renderTable(danhSachNhanVien);
}

getEle("btnTimNV").onclick = () => {
  const keyword = getEle("searchName").value.toLowerCase();
  const result = danhSachNhanVien.filter(nv => nv.xepLoai().toLowerCase().includes(keyword));
  renderTable(result);
};

function resetForm() {
  document.querySelector("form").reset();
  getEle("tknv").disabled = false;
  indexCapNhat = -1;
}

function validateForm(tk, ten, email, mk, ngay, luongCB, chucVu, gioLam) {
  if (!/^\d{4,6}$/.test(tk)) return alert("Tài khoản phải từ 4-6 số") || false;
  if (!/^([a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+)$/.test(ten)) return alert("Tên phải là chữ") || false;
  if (!/^\S+@\S+\.\S+$/.test(email)) return alert("Email không hợp lệ") || false;
  if (!/^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/.test(mk)) return alert("Mật khẩu yếu") || false;
  if (!/^(0[1-9]|1[0-2])\/([0-2][0-9]|3[01])\/\d{4}$/.test(ngay)) return alert("Ngày sai định dạng mm/dd/yyyy") || false;
  if (luongCB < 1000000 || luongCB > 20000000) return alert("Lương phải từ 1tr - 20tr") || false;
  if (chucVu === "Chọn chức vụ") return alert("Vui lòng chọn chức vụ") || false;
  if (gioLam < 80 || gioLam > 200) return alert("Giờ làm phải từ 80-200") || false;
  return true;
}
