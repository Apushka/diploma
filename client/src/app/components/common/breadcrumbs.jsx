import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getCategoriesList } from "../../store/categories";

// const breadCrumbsSchema = {
//     "": "Главная",
//     makeup: "Макияж",
//     face: "Лицо",
//     brows: "Брови",
//     nails: "Ногти",
//     eyes: "Глаза",
//     lips: "Губы",
//     actions: "Акции",
//     novelties: "Новинки",
//     about: "О Бренде",
//     skincare: "Уход за кожей",
//     bestsellers: "Бестселлеры",
//     accessories: "Аксессуары",
//     face_primers: "Праймеры",
//     face_tones: "Тональные средства",
//     face_concealers: "Корректоры/Консилеры",
//     face_powders: "Пудра",
//     face_blushers: "Румяна",
//     face_highlighters: "Скульптор/Хайлайтер",
//     face_fixators: "Фиксаторы (для макияжа)",
//     face_brushes: "Кисти для лица/спонжи",
//     brows_gels: "Гели для бровей",
//     brows_shadows: "Тени для бровей",
//     brows_pencils: "Карандаши  и маркеры",
//     brows_brushes: "Кисти для бровей",
//     nails_polish: "Лаки для ногтей",
//     nails_bases: "Базы и покрытия для ногтей",
//     nails_care: "Уход за ногтями",
//     nails_accessories: "Аксессуары для маникюра",
//     eyes_mascara: "Тушь для ресниц",
//     eyes_bases: "Основа под тени",
//     eyes_shadows: "Тени для век",
//     eyes_pencils: "Карандаши  и подводки",
//     eyes_brushes: "Кисти для глаз",
//     lips_lipsticks: "Помады",
//     lips_tints: "Блески и тинты",
//     lips_pencils: "Карандаши для губ",
//     lips_balms: "Бальзамы для губ",
//     lips_brushes: "Кисти для губ",
//     accessories_brushes: "Кисти/Спонжи",
//     accessories_other: "Другое"
// };

const BreadCrumbs = () => {
    const params = useParams();
    const location = useLocation();
    const [breadcrumbs] = useState([]);
    const categories = useSelector(getCategoriesList);
    console.log(categories);

    useEffect(() => {

    }, [params, location]);

    return <div className="h-7">
        {breadcrumbs.map((br, index) => <Link
            className={index === breadcrumbs.length - 1 ? "font-bold" : ""}
            to={br.to}
            key={br.to}>{br.breadcrumb}</Link>)}
    </div>;
};

export default BreadCrumbs;
