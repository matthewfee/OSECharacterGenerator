import React from "react"
import CircleLoader from "react-spinners/CircleLoader"
import { css } from "@emotion/react"
import { useTranslation, Trans } from "react-i18next"
import { LinkText } from "../utilities/utilities"
import { lngs } from "../constants/constants"

export default function Header(props) {
  const { t, i18n } = useTranslation()

  const {
    characterRolled,
    setCharacterRolled,
    rollButtonHover,
    setRollButtonHover,
    loadingRandomNumbers,
    setLoadingRandomNumbers,
    pages,
    setPages,
    rollCharacter,
  } = props

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `

  const showStorageSheetScreen = () => {
    setPages((pages) => {
      return {
        ...pages,
        characterStorageScreen: true,
        characterSheetScreen: false,
        abilityScreen: false,
      }
    })
  }

  const myCharacters = JSON.parse(
    window.localStorage.getItem("characterStorage"),
  )

  return (
    <header className={`header ${characterRolled ? "" : "header--initial"}`}>
      <h2
        className={`title ${rollButtonHover ? "fade" : ""}`}
        style={{ fontSize: characterRolled ? "1.2rem" : "" }}
      >
        <Trans i18nKey="AppName"></Trans>
        {/* OSE Character Generator */}
      </h2>
      {pages.abilityScreen && !characterRolled && (
        <button
          className={`button button--roll button-primary`}
          onClick={rollCharacter}
          disabled={loadingRandomNumbers ? true : false}
          onMouseEnter={() => setRollButtonHover(true)}
          onMouseLeave={() => setRollButtonHover(false)}
        >
          {!loadingRandomNumbers && (
            <div>
              <Trans i18nKey="Roll"></Trans>
            </div>
          )}

          <div className="sweet-loading">
            <CircleLoader
              css={override}
              size={50}
              color={"white"}
              loading={loadingRandomNumbers}
            />
          </div>
        </button>
      )}

      {pages.abilityScreen && !characterRolled && myCharacters && (
        <button
          className={`button button--storage button-primary ${
            rollButtonHover ? "fade" : ""
          }`}
          onClick={() => {
            setPages({
              ...pages,
              abilityScreen: false,
              characterStorageScreen: true,
            })
            setCharacterRolled(true)
          }}
        >
          <Trans i18nKey="Tavern"></Trans>
        </button>
      )}

      {pages.abilityScreen && !characterRolled && (
        <div
          className={`main-page--subheader ${rollButtonHover ? "fade" : ""} `}
        >
          <Trans
            i18nKey="AppDescription"
            t={t}
            components={[
              <LinkText href="https://necroticgnome.com/" />,
              <LinkText href="https://random.org" />,
            ]}
          />
          <br></br>
          <br></br>
          <Trans
            i18nKey="CreatedBy"
            t={t}
            components={[
              <LinkText href="https://eviltables.dev/ose-character-generator/" />,
            ]}
          />
          <br></br>
          <br></br>
          <div>
            {Object.keys(lngs).map((lng) => (
              <button
                key={lng}
                style={{
                  fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
                }}
                type="submit"
                onClick={() => i18n.changeLanguage(lng)}
              >
                {lngs[lng].nativeName}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
