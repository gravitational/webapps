import React from 'react';
import { Basic, Success, Failed } from './Login.story';
import { render } from 'design/utils/testing';

describe('Gravity/Login.story', () => {
  it('basic login renders correctly', () => {
    const { container } = render(<Basic />);
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: block;
        outline: none;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        margin-bottom: 40px;
        max-width: 200px;
        max-height: 120px;
      }

      .c2 {
        box-sizing: border-box;
        padding: 40px;
      }

      .c4 {
        box-sizing: border-box;
        margin-bottom: 24px;
      }

      .c7 {
        line-height: 1.5;
        margin: 0;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        box-sizing: border-box;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: inherit;
        font-weight: 600;
        outline: none;
        position: relative;
        text-align: center;
        -webkit-text-decoration: none;
        text-decoration: none;
        text-transform: uppercase;
        -webkit-transition: all .3s;
        transition: all .3s;
        -webkit-font-smoothing: antialiased;
        background: #00BFA5;
        color: #FFFFFF;
        min-height: 48px;
        font-size: 14px;
        padding: 0px 48px;
        margin-top: 16px;
        margin-bottom: 16px;
        width: 100%;
      }

      .c7:active {
        opacity: .56;
      }

      .c7::-moz-focus-inner {
        border: 0;
      }

      .c7:hover,
      .c7:focus {
        background: #00EAC3;
      }

      .c7:active {
        background: #26A69A;
      }

      .c7:disabled {
        background: rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.3);
      }

      .c1 {
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
        margin-top: 32px;
        margin-bottom: 32px;
        width: 456px;
        background-color: #222C59;
        box-shadow: 0 8px 32px rgba(0,0,0,0.24);
        border-radius: 8px;
      }

      .c6 {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 4px;
        box-shadow: inset 0 2px 4px rgba(0,0,0,.24);
        box-sizing: border-box;
        border: none;
        display: block;
        height: 40px;
        font-size: 16px;
        padding: 12px 16px;
        outline: none;
        width: 100%;
        color: rgba(0,0,0,0.87);
        background-color: #FFFFFF;
      }

      .c6::-ms-clear {
        display: none;
      }

      .c6::-webkit-input-placeholder {
        opacity: 0.24;
      }

      .c6::-moz-placeholder {
        opacity: 0.24;
      }

      .c6:-ms-input-placeholder {
        opacity: 0.24;
      }

      .c6::placeholder {
        opacity: 0.24;
      }

      .c5 {
        color: #FFFFFF;
        display: block;
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        width: 100%;
        margin-bottom: 4px;
      }

      .c3 {
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 300;
        font-size: 26px;
        line-height: 40px;
        margin: 0px;
        margin-bottom: 16px;
        color: #FFFFFF;
        text-align: center;
      }

      <div>
        <img
          class="c0"
          src="file_stub"
        />
        <form
          class="c1"
          width="456px"
        >
          <div
            class="c2"
          >
            <div
              class="c3"
              color="light"
            >
              Gravity
            </div>
            <div
              class="c4"
            >
              <label
                class="c5"
                font-size="0"
              >
                Username
              </label>
              <input
                autocomplete="off"
                class="c6"
                color="text.onLight"
                placeholder="User name"
                value=""
              />
            </div>
            <div
              class="c4"
            >
              <label
                class="c5"
                font-size="0"
              >
                Password
              </label>
              <input
                autocomplete="off"
                class="c6"
                color="text.onLight"
                placeholder="Password"
                type="password"
                value=""
              />
            </div>
            <button
              class="c7"
              kind="primary"
              type="submit"
              width="100%"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    `);
  });

  it('login success renders correctly', () => {
    const { container } = render(<Success />);
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: block;
        outline: none;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        margin-bottom: 40px;
        max-width: 200px;
        max-height: 120px;
      }

      .c2 {
        display: inline-block;
        -webkit-transition: color .3s;
        transition: color .3s;
        margin-bottom: 16px;
        color: #00bfa5;
        font-size: 64px;
      }

      .c1 {
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
        margin-top: 24px;
        margin-bottom: 24px;
        padding: 48px;
        width: 540px;
        background-color: #222C59;
        text-align: center;
        box-shadow: 0 8px 32px rgba(0,0,0,0.24);
        border-radius: 8px;
      }

      .c3 {
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 300;
        font-size: 34px;
        line-height: 56px;
        margin: 0px;
        margin-bottom: 16px;
      }

      .c4 {
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 300;
        font-size: 16px;
        line-height: 32px;
        margin: 0px;
      }

      <div>
        <img
          class="c0"
          src="file_stub"
        />
        <div
          class="c1"
          width="540px"
        >
          <span
            class="icon icon-checkmark-circle  c2"
            color="success"
            font-size="64"
          />
          <div
            class="c3"
          >
            Login Successful
          </div>
          <div
            class="c4"
          >
            You have successfully signed into your account. You can close this window and continue using the product.
          </div>
        </div>
      </div>
    `);
  });

  it('failed login renders correctly', () => {
    const { container } = render(<Failed />);
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: block;
        outline: none;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        margin-bottom: 40px;
        max-width: 200px;
        max-height: 120px;
      }

      .c1 {
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        margin-bottom: 40px;
        padding: 32px;
        width: 540px;
        color: rgba(0,0,0,0.87);
        background-color: #FFFFFF;
        box-shadow: 0 8px 32px rgba(0,0,0,0.24);
        border-radius: 8px;
      }

      .c4 {
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 300;
        font-size: 16px;
        line-height: 32px;
        margin: 0px;
      }

      .c2 {
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 300;
        font-size: 34px;
        line-height: 56px;
        margin: 0px;
        margin-bottom: 16px;
        text-align: center;
      }

      .c3 {
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        margin: 0px;
      }

      .c5 {
        color: #03a9f4;
      }

      <div>
        <img
          class="c0"
          src="file_stub"
        />
        <div
          class="c1"
          color="text.onLight"
          width="540px"
        >
          <div
            class="c2"
          >
            Login unsuccessful
          </div>
          <div>
             
            <div
              class="c3"
            >
              <div
                class="c4"
              >
                <a
                  class="c5"
                  href="/web/login"
                >
                  Please try again
                </a>
                , if the problem persists, contact your system administrator.
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
