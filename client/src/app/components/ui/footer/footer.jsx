import React from "react";
import styles from "./footer.module.scss";
import FooterNavLink from "./footerNavLink";

const Footer = () => {
    return (
        <footer className={styles.container}>
            <section className={styles.section}>
                <h3 className={styles.title}>МАГАЗИН</h3>
                <ul>
                    <li>
                        <FooterNavLink to="/novelties">Новинки</FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/bestsellers">
                            Бестселлеры
                        </FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/actions">Акции</FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/delivery">
                            Оплата и доставка
                        </FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/exchange">
                            Обмен и возврат товара
                        </FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/faq">
                            Часто задаваемые вопросы
                        </FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/shops">Где купить?</FooterNavLink>
                    </li>
                </ul>
            </section>
            <section className={styles.section}>
                <h3 className={styles.title}>КОМПАНИЯ</h3>
                <ul>
                    <li>
                        <FooterNavLink to="/about">О бренде</FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/policy">
                            Политика конфиденциальности
                        </FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/job">Карьера</FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/contacts">Контакты</FooterNavLink>
                    </li>
                </ul>
            </section>
            <section className={styles.section}>
                <h3 className={styles.title}>СЛУЖБА ПОДДЕРЖКИ</h3>
                <a href="tel:+375 55 550 55 55">тел. +375 55 550 55 55</a>
            </section>
            <section className={styles.section}>
                <h3 className={styles.title}>ДЛЯ БИЗНЕСА</h3>
                <ul>
                    <li>
                        <FooterNavLink to="/cooperation">
                            Сотрудничество
                        </FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/declarations">
                            Декларации
                        </FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/catalog">Каталог</FooterNavLink>
                    </li>
                    <li>
                        <FooterNavLink to="/production">
                            Производство
                        </FooterNavLink>
                    </li>
                </ul>
            </section>
            <section className={styles.section}>
                <h3 className={styles.title}>МЫ В СОЦИАЛЬНЫХ СЕТЯХ</h3>
                contacts
            </section>
        </footer>
    );
};

export default Footer;
