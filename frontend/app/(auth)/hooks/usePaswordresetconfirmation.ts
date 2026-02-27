import { useState } from "react"
import { passwordResetConfirm } from "@/app/(auth)/endpoints"

export function usePasswordResetConfirmation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newpassworderror, setNewPasswordError] = useState<string | null>(null)
  const [confirmpassworderror, setConfirmpasswordError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const resetPassword = async (uid: string, token: string, newPassword1: string, newPassword2: string) => {
    setLoading(true)
    setError(null)
    setNewPasswordError(null)
    setConfirmpasswordError(null)
    setSuccess(false)

    try {
      await passwordResetConfirm(uid, token, newPassword1, newPassword2)
      setSuccess(true)
    } catch (err: any) {
      if (err.response?.data) {
        const data = err.response.data
        if (data.new_password1) {
          data.new_password1.forEach((msg: string) => {
            setNewPasswordError(msg)
            // if (msg === "This field may not be blank.") {
            //   setNewPasswordError("新しいパスワードを入力してください")
            // } else if (msg === "This password is too short. It must contain at least 8 characters.") {
            //   setNewPasswordError("新しいパスワードは8文字以上で設定してください")
            // } else if (msg === "This password is too common.") {
            //   setNewPasswordError("よく使われるパスワードは設定できません")
            // } else if (msg === "This password is entirely numeric.") {
            //   setNewPasswordError("パスワードに数字のみの設定はできません")
            // } else {
            //   setNewPasswordError(msg)
            // }
          })
        }
        if (data.new_password2) {
          data.new_password2.forEach((msg: string) => {
            setConfirmpasswordError(msg)
            // if (msg === "This field may not be blank.") {
            //   setConfirmpasswordError("確認用パスワードを入力してください")
            // } else if (msg === "The two password fields didn't match.") {
            //   setConfirmpasswordError("確認用パスワードが一致しません")
            // } else {
            //   setConfirmpasswordError(msg)
            // }
          })
        }
        
      } else {
        setError("サーバーエラーが発生しました")
      }
    } finally {
      setLoading(false)
    }
  }

  return { resetPassword, loading, newpassworderror, confirmpassworderror, error, success }
}
