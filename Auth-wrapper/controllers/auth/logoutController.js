export const logoutController = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
    timeStamp: new Date().toISOString(),
  });
};
