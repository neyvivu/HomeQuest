import express from "express";
import {
  getPriceTrends,
  getROIHistory,
  getFlatTypeDistribution,
  getTownDistribution,
  getInvestorProperties,
} from "../controllers/investor.controller.js";

const router = express.Router();

router.get("/price-trends", getPriceTrends);
router.get("/roi-history", getROIHistory);
router.get("/flat-type-distribution", getFlatTypeDistribution);
router.get("/town-distribution", getTownDistribution);
router.get("/search/all/:flatType?/:remainingLease?/:level?/:town?", getInvestorProperties);
router.get("/search/:searchTerm/:flatType/:remainingLease/:level/:town", getInvestorProperties);
router.get("/search/:searchTerm", getInvestorProperties);

export default router;