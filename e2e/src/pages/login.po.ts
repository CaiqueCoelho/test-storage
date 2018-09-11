import { browser, element, by } from 'protractor';
import { Helpers } from '../helpers/Helpers';

export class LoginPage extends Helpers {

    // Locators

    loginInput = element(by.name('username'));
    passwordInput = element(by.name('password'));
    loginButton = element(by.css('.btn-primary'));

    // Methods

    navigateTo() {
        return browser.get('/auth', 30000);
    }

    typeLogin(login: string) {
        this.waitForPresenceOf(this.loginInput);
        this.loginInput.sendKeys(login);
        return this;
    }

    typePassword(password: string) {
        this.waitForPresenceOf(this.passwordInput);
        this.passwordInput.sendKeys(password);
        return this;
    }

    submitLoginButton() {
        this.waitForClickable(this.loginButton);
        this.loginButton.click();
        // return new HomePage();
    }

    isLoginPage(): boolean {
        this.waitForPresenceOf(this.loginInput);
        if (this.loginInput.isDisplayed) {
            return true;
        } else {
            return false;
        }
    }
}
