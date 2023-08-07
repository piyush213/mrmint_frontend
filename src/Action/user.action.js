import { getRequest, postRequest, putRequest, deleteRequest, postRequestFormData } from "../coreFIles/helper";
import { marketPlacegetRequest, marketPlacePostRequest, marketPlaceputRequest, marketPlacedeleteRequest, marketPlacepostRequestFormData } from "../coreFIles/marketplaceHelper";

export const RegisterAction = (data) => {
   return postRequest('userRegister', data).then(res => { return res.data })
}

export const miningcampAction = (data) => {
   return postRequest('miningcamp', data).then(res => { return res.data })
}

export const generatenewticketAction = (data) => {
   return postRequestFormData('generatenewticket', data).then(res => { return res.data })
}

export const userreplyonticketAction = (data) => {
   return postRequest('userreplyonticket', data).then(res => { return res.data })
}

export const getlistofmyticketsAction = (data) => {
   return getRequest('getlistofmytickets', data).then(res => { return res.data })
}

export const getchatofmyticketsAction = (data) => {
   return postRequest('getchatofmytickets', data).then(res => { return res.data })
}

export const miningTransferAction = (data) => {
   return getRequest('miningTransfer', data).then(res => { return res.data })
}

export const LoginAction = (data) => {
   return postRequest('login', data).then(res => { return res.data })
}

export const verifyAccountAction = (data) => {
   return postRequest('verifyAccount', data).then(res => { return res.data })
}

export const ForgotPasswordAction = (data) => {
   return postRequest('forgotPassword', data).then(res => { return res.data })
}

export const ResetPasswordAction = (data) => {
   return postRequest('resetPassword', data).then(res => { return res.data })
}

export const getProfileAction = (data) => {
   return postRequest('getUserProfile', data).then(res => { return res.data })
}

export const sendOtp = (data) => {
   return postRequest('emailKycOtp', data).then(res => {return res.data })
}

export const checkemailandOtp = (data) => {
   return postRequest('checkEmailKycOtp', data).then(res => {return res.data })
}

export const getVerificationStatus = (data) => {
   return postRequest('getverificationstatus', data).then(res => { return res.data })
}

export const uploadKYCdocument = (data) => {
   return postRequestFormData('uploadkycdocument', data).then(res => { return res.data })
}

export const getListofKycDocument = () => {
   return getRequest('getlistofKycdocument').then(res => { return res.data })
}

export const getlatestnotificationAction = () => {
   return getRequest('getlatestnotification').then(res => { return res.data })
}

export const getcountofunreadnotificationAction = () => {
   return getRequest('getcountofunreadnotification').then(res => { return res.data })
}

export const allnotificationlistAction = () => {
   return getRequest('allnotificationlist').then(res => { return res.data })
}

export const updatePasswordAction = (data) => {
   return postRequest('updatePassword', data).then(res => { return res.data })
}

export const UpdateProfileAction = (data) => {
   return postRequestFormData('UpdateUserProfile', data).then(res => { return res.data })
}

export const marknotificationasreadAction = (data) => {
   return postRequest('marknotificationasread', data).then(res => { return res.data })
}

export const getPhaseAction = (data) => {
   return postRequest('getPhase', data).then(res => { return res.data })
}

export const getActivePhaseAction = (data) => {
   return postRequest('getActivePhase', data).then(res => { return res.data })
}

export const transferMNTAction = (data) => {
   return getRequest('balanceTransfer', data).then(res => { return res.data })
}

export const tokenPurchaseAction = (data) => {
   return postRequest('tokenPurchase', data).then(res => { return res.data })
}

export const getTokenPurchaseAction = (data) => {
   return postRequest('getTokenPurchase', data).then(res => { return res.data })
}

export const getMntWalletDetailsAction = (data) => {
   return postRequest('getMntWalletDetails', data).then(res => { return res.data })
}

export const getWalletBalanceAction = (data) => {
   return getRequest('getUSDBalance', data).then(res => { return res.data })
}

export const userWithdrawAction = (data) => {
   return postRequest('addWithdrawRequest', data).then(res => { return res.data })
}

export const userWithdrawMNTAction = (data) => {
   return postRequest('userWithdraw', data).then(res => { return res.data })
}

export const getWithdrawListAction = (data) => {
   return getRequest('getNFTWithdrawList', data).then(res => { return res.data })
}

export const userMNTWithdrawAction = (data) => {
   return postRequest('getWithdrawList', data).then(res => { return res.data })
}

export const getTotalIncomeAction = (data) => {
   return postRequest('getTotalRefIncome', data).then(res => { return res.data })
}

export const getDirectReferralAction = (data) => {
   return postRequest('getDirectReferralCount', data).then(res => { return res.data })
}

export const getReferralUsersListAction = (data) => {
   return getRequest('getNFTReferralList', data).then(res => { return res.data })
}

export const getRefUsersListAction = (data) => {
   return postRequest('getReferralUsersList', data).then(res => { return res.data })
}

export const getNodesListAction = (data) => {
   return postRequest('getNodesList', data).then(res => { return res.data })
}

export const getnftNodesListAction = (data) => {
   return postRequest('getnftNodesList', data).then(res => { return res.data })
}

export const getstatisticsListAction = (data) => {
   return postRequest('getstatisticsList', data).then(res => { return res.data })
}

export const getNFTstatisticsListAction = (data) => {
   return getRequest('getUserDashboard', data).then(res => { return res.data })
}

export const getstatisticsListNFTAction = (data) => {
   return postRequest('getnftstatisticsList', data).then(res => { return res.data })
}

export const addNewsLetterAction = (data) => {
   return postRequest('addNewsLetter', data).then(res => { return res.data })
}

export const ContactFormAction = (data) => {
   return postRequest('contactFormRequest', data).then(res => { return res.data })
}

export const getEarningProjectionsAction = (data) => {
   return postRequest('getEarningProjections', data).then(res => { return res.data })
}

export const getTeamReferralAction = (data) => {
   return postRequest('getTeamReferral', data).then(res => { return res.data })
}

export const getnftTeamReferralAction = (data) => {
   return postRequest('getnftTeamReferral', data).then(res => { return res.data })
}

export const getTeamReferralListAction = (data) => {
   return postRequest('getTeamReferralList', data).then(res => { return res.data })
}

export const getnftTeamReferralListAction = (data) => {
   return postRequest('getnftTeamReferralList', data).then(res => { return res.data })
}

export const LoginWithAddressAction = (data) => {
   return postRequest('LoginWithAddress', data).then(res => { return res.data })
}

export const getRewardsListAction = (data) => {
   return postRequest('getRewardsList', data).then(res => { return res.data })
}

export const getBlockExpansionIncomeAction = (data) => {
   return postRequest('getBlockExpansionIncome', data).then(res => { return res.data })
}

export const getTokenAllocationAction = (data) => {
   return postRequest('getTokenAllocation', data).then(res => { return res.data })
}

export const getCapingPlanAction = (data) => {
   return postRequest('getCapingPlan', data).then(res => { return res.data })
}

//  Ajay's code start....

export const stackingSubmitAction = (data) => {
   return postRequest('submitStacking', data).then(res => { return res.data })
}

export const getUserStackingHistoryAction = (data) => {
   return postRequest('getUserStackingHistory', data).then(res => { return res.data })
}

export const stackingPriceAction = (data) => {
   return postRequest('getStackingPrice', data).then(res => { return res.data })
}

export const getEarningHistoryAction = (data) => {
   return postRequest('getEarningHistory', data).then(res => { return res.data })
}

export const getUpcomingEventsListAction = (data) => {
   return postRequest('getUpcomingEventsList', data).then(res => { return res.data })
}

export const getAchieversAction = (data) => {
   return postRequest('getuserAchiever', data).then(res => { return res.data })
}

export const getuserBlogAction = (data) => {
   return postRequest('getuserBlog', data).then(res => { return res.data })
}

export const getuserBlogidAction = (data) => {
   return postRequest('getuserblogid', data).then(res => { return res.data })
}

export const getRecentuserBlogidAction = (data) => {
   return postRequest('getRecentuserBlog', data).then(res => { return res.data })
}

export const getUserBlogSliderAction = (data) => {
   return postRequest('getUserBlogSlider', data).then(res => {return res.data})
}

export const getLatestReleasesAction = (data) => {
   return getRequest('getLatestReleases', data).then(res => {return res.data})
}

export const getArticlesAction = (data) => {
   return getRequest('getArticles', data).then(res => {return res.data})
}

export const getArticlesByCategoryAction = (data) => {
   return postRequest('getArticlesByCategory', data).then(res => {return res.data})
}

export const getLatestReleasesDetailsAction = (data) => {
   return postRequest('getLatestReleasesDetails', data).then(res => {return res.data})
}

export const getRecentReleasesAction = (data) => {
   return getRequest('getRecentReleases', data).then(res => {return res.data})
}

export const getArticleDetailsAction = (data) => {
   return postRequest('getArticleDetails', data).then(res => {return res.data})
}

export const getRecentArticleAction = (data) => {
   return getRequest('getRecentArticle', data).then(res => {return res.data})
}

export const getGalleryAction = (data) => {
   return getRequest('getGalleryList', data).then(res => {return res.data})
}

export const getArticleCategoryAction = (data) => {
   return getRequest('getArticleCategory', data).then(res => {return res.data})
}

export const getVideosAction = (data) => {
   return getRequest('getVideos', data).then(res => {return res.data})
}

export const getMysteryBoxAction = (data) => {
   return postRequest('getUserBoxDetail', data).then(res => {return res.data})
}

export const insertRigAction = (data) => {
   return marketPlacePostRequest('insertRig', data).then(res => {return res.data})
}

// export const getRigNftDetailsForUsersAction = (data) => {
//    return getRequest('getRigNftDetailsForUsers', data).then(res => {return res.data})
// }

export const getRigNftDetailsForUsersAction = (data) => {
   return marketPlacePostRequest('getRigNftDetailsForUsers', data).then(res => {return res.data})
}

export const nftPutOnSaleAction = (data) => {
   return marketPlacePostRequest('nftPutOnSale', data).then(res => {return res.data})
}

export const getNftDetailsOfUserAction = (data) => {
   return marketPlacegetRequest(`getNftDetailsOfUser`, data).then(res => {return res.data})
}

export const getRigDetailsOfUserAction = (data) => {
   return marketPlacegetRequest(`rigrewardhistory`, data).then(res => {return res.data})
}

export const getmntdeposithistoryAction = (data) => {
   return marketPlacegetRequest(`getmntdeposithistory`, data).then(res => {return res.data})
}

export const showRigsForUserAction = (data) => {
   return marketPlacegetRequest('showRigsForUser', data).then(res => {return res.data})
}

export const displayNftUsedinRigAction = (data) => {
   return marketPlacegetRequest(`displayNftUsedinRig?id=${data}`).then(res => {return res.data})
}

// export const displayNftUsedinRig2Action = (data) => {
//    return marketPlacegetRequest('displayNftUsedinRig?id=', data).then(res => {return res.data})
// }

// export const displayNftUsedinRig3Action = (data) => {
//    return marketPlacegetRequest('displayNftUsedinRig?id=', data).then(res => {return res.data})
// }

// export const getNftDetailsOfUserAction = (data) => {
//    return getRequest('getNftDetailsOfUser', data).then(res => {return res.data})
// }

export const getMintingCardDetailsAction = (data) => {
   return postRequest('getCardDetailById', data).then(res => {return res.data})
}

export const nftMintAction = (data) => {
   return postRequest('mintNFT', data).then(res => {return res.data})
}

export const deleteRigMasterAction = (data) => {
   return marketPlacePostRequest('deleteRigMaster', data).then(res => {return res.data})
}

export const getMintedNFTsListAction = (data) => {
   return postRequest('getMintedNftList', data).then(res => {return res.data})
}

export const getRechargePlanAction = (data) => {
   return getRequest('getRechargePlan', data).then(res => {return res.data})
}

export const getRewardHistoryAction = (data) => {
   return postRequest('getNFTRewardList', data).then(res => {return res.data})
}

export const getDailyRewardAction = (data) => {
   return postRequest('getMatchingRewardList', data).then(res => { return res.data })
}

export const rechargeNFTAction = (data) => {
   return postRequest('recharge', data).then(res => { return res.data })
}

export const getTransferHistoryAction = (data) => {
   return getRequest('autopoolTransferList', data).then(res => { return res.data })
}

export const getRechargeHistoryAction = (data) => {
   return getRequest('userRechargeHistory', data).then(res => { return res.data })
}

export const autopoolTransferAction = (data) => {
   return getRequest('autopoolTransfer', data).then(res => { return res.data })
}

export const getMintingCardRechargeHistoryAction = (data) => {
   return postRequest('rechargeHistoryByMysterBoxId', data).then(res => { return res.data })
}

export const miningWalletTransferAction = (data) => {
   return getRequest('miningTransfer', data).then(res => { return res.data })
}

export const getPoolEarningHistoryAction = (data) => {
   return getRequest('getAutopoolEraning', data).then(res => { return res.data })
}
export const getMiningTransferHistoryAction = (data) => {
   return getRequest('miningTransferList', data).then(res => { return res.data })
}
export const getLevelAction = (data) => {
   return postRequest('getAutopoolNodeList', data).then(res => { return res.data })
}
export const mntdeposittomainwallet = (data) => {
   return marketPlacePostRequest('mntdeposittomainwallet', data).then(res => { return res.data })
}