import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";

const formSchema = Yup.object().shape({
  isim: Yup.string()
    .required("İsim alanı zorunludur")
    .min(3, "İsim en az 3 karakter olmalı"),
  email: Yup.string()
    .email("Lütfen geçerli bir email adresi girin")
    .required("Email alanı zorunludur"),
  sifre: Yup.string()
    .required("Şifre alanı zorunludur")
    .min(8, "İsim en az 8 karakter olmalı"),
  gorev: Yup.string().oneOf(["backEndDeveloper", "frontEndDeveloper"]),
  KullanimSartlari: Yup.boolean().oneOf(
    [true],
    "Uygulamayı kullanmak için koşulları kabul etmelisiniz"
  ),
  bilgilendirme: Yup.boolean().oneOf([true, false]),
  bilgilendirmeTuruMesaj: Yup.boolean().oneOf([true, false]),
  bilgilendirmeTuruMail: Yup.boolean().oneOf([true, false]),

  // required isn't required for checkboxes.
});

const initialState = {
  isim: "",
  email: "",
  sifre: "",
  gorev: null,
  KullanimSartlari: false,
  bilgilendirme: false,
  bilgilendirmeTuruMesaj: false,
  bilgilendirmeTuruMail: false,
};

function Form() {
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState(initialState);

  const [buttonDisabledMi, setButtonDisabledMi] = useState(true);

  const [kullanicilar, setKullanicilar] = useState([
    {
      isim: "irem",
      email: "i@gmail.com",
      sifre: "irem1234",
      gorev: "backEndDeveloper",
      KullanimSartlari: true,
      bilgilendirme: false,
      bilgilendirmeTuruMesaj: false,
      bilgilendirmeTuruMail: false,
    },
  ]);

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setButtonDisabledMi(!valid));
  }, [formData]);

  const checkFormErrors = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };

  //bir şeyler denediğim için böyle yazdım
  // function handleChange(event) {
  //   const { name, value, checked, type } = event.target;

  //   if (type === "checkbox") {
  //     const yeniState1 = { ...formData, [name]: checked };
  //     console.log("checkboxname:" + name);
  //     console.log("checkboxvalue:" + value);
  //     console.log("checkboxchecked:" + checked);

  //     setFormData(yeniState1);
  //   }
  //   if (type === "radio") {
  //     const yeniState2 = { ...formData, [name]: value };
  //     setFormData(yeniState2);

  //     console.log("radioname:" + name);
  //     console.log("radiovalue:" + value);
  //     console.log("radiochecked:" + checked);
  //   } else {
  //     const yeniState3 = { ...formData, [name]: value };

  //     setFormData(yeniState3);
  //   }
  // }

  //KISACA ŞÖYLE YAZILIR
  function handleChange(event) {
    const { name, value, checked, type } = event.target;
    let valueToUse = type === "checkbox" ? checked : value;

    checkFormErrors(name, valueToUse);
    setFormData({
      ...formData,
      [name]: valueToUse,
    });
  }

  function handleClickReset() {
    setFormData(initialState);
  }

  function handleClickSubmit(e) {
    e.preventDefault();
    console.log("formData" + formData);
    console.log("submitted!");
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        //buradaki data içerde tanımladığım değil
        //data yazınca sadece istediğin değişkenleri veriyor
        let yeniKullanicilar = [...kullanicilar, res.data];
        setKullanicilar(yeniKullanicilar);
        console.log(yeniKullanicilar);
      })
      .catch((err) => console.log(err.response));
  }

  return (
    <div className="Form">
      <p>Yeni Üye Formu</p>
      <form onSubmit={handleClickSubmit}>
        <div>
          <label htmlFor="isimalani">İsim Soyisim: </label>
          <input
            type="text"
            onChange={handleChange}
            value={formData.isim}
            id="isimalani"
            name="isim"
            placeholder="İsminizi yazın"
          />
        </div>
        {errors.isim !== "" && <div>{errors.isim}</div>}
        <div>
          <label htmlFor="emailalani">Email: </label>
          <input
            type="text"
            onChange={handleChange}
            value={formData.email}
            id="emailalani"
            name="email"
            placeholder="Emailinizi yazın"
          />
        </div>
        {errors.email !== "" && <div>{errors.email}</div>}
        <div>
          <label htmlFor="sifrealani">Şifre: </label>
          <input
            type="password"
            onChange={handleChange}
            value={formData.sifre}
            id="sifrealani"
            name="sifre"
            placeholder="Şifrenizi yazın"
          />
        </div>
        {errors.sifre !== "" && <div>{errors.sifre}</div>}
        <label>Görev</label>
        <div>
          <label>
            <input
              type="radio"
              onChange={handleChange}
              value="backEndDeveloper"
              name="gorev"
              checked={formData.gorev === "backEndDeveloper"}
            />
            Back-end developer
          </label>
          <label>
            <input
              type="radio"
              onChange={handleChange}
              value="frontEndDeveloper"
              name="gorev"
              checked={formData.gorev === "frontEndDeveloper"}
            />
            Front-end developer
          </label>
        </div>

        <div>
          <label>Kullanım şartlarını kabul ediyor musun?</label>
          <label>
            <input
              type="checkbox"
              onChange={handleChange}
              name="KullanimSartlari"
              checked={formData.KullanimSartlari}
            />
            Evet
          </label>
        </div>
        {errors.KullanimSartlari !== "" && <div>{errors.KullanimSartlari}</div>}
        <div>
          <label>Bilgi almak istiyor musun?</label>
          <label>
            <input
              type="checkbox"
              onChange={handleChange}
              name="bilgilendirme"
              checked={formData.bilgilendirme}
            />
            Evet
          </label>
        </div>

        {formData.bilgilendirme && (
          <div>
            <br />
            <label>İletişim seçenekleri</label>
            <label>
              <input
                type="checkbox"
                onChange={handleChange}
                name="bilgilendirmeTuruMail"
                checked={formData.bilgilendirmeTuruMail}
              />
              Mail
            </label>
            <label>
              <input
                type="checkbox"
                onChange={handleChange}
                name="bilgilendirmeTuruMesaj"
                checked={formData.bilgilendirmeTuruMesaj}
              />
              Mesaj
            </label>
          </div>
        )}

        {formData.bilgilendirme &&
          !formData.bilgilendirmeTuruMail &&
          !formData.bilgilendirmeTuruMesaj && (
            <p>Lütfen bir iletişim türünü seçiniz </p>
          )}

        <br />
        <button type="submit" disabled={buttonDisabledMi}>
          Formu gönder
        </button>
        <br />
        <button type="button" onClick={handleClickReset}>
          Formu temizle
        </button>
      </form>
      <div>
        {kullanicilar.map((item) => {
          <div> {item.isim} </div>;
        })}
      </div>
    </div>
  );
}

export default Form;

// input radio button larda yalnızca bir seçeneğin işaretlenmesini sağlamak için
//input taglerine name="" eklemeliyim
//value değeri vermezsen kendisi event.target.value değerini "on" diye yazdırıyor

//input type text lerde value değerini stateler ile yadığımız şeye eşitliyorduk
//burada bir şey yazmadığımız için kendimiz value değerini labelı ile aynı yazmalıyız
