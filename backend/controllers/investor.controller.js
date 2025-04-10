import { InvestorProperty } from "../db/investorProperty.model.js";

// 1. Price Trends Over Time - Average resale price per month
export const getPriceTrends = async (req, res, next) => {
  try {
    const trends = await InvestorProperty.aggregate([
      {
        $group: {
          _id: "$month",
          avgPrice: { $avg: "$resale_price" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    const formattedTrends = trends.map(item => ({
      date: item._id,
      price: Number(item.avgPrice.toFixed(2))
    }));
    res.status(200).json(formattedTrends);
  } catch (error) {
    next(error);
  }
};

// 2. ROI Trends Over Time
// (For demonstration, calculate a dummy ROI using resale_price and floor_area_sqm)
export const getROIHistory = async (req, res, next) => {
  try {
    const roiData = await InvestorProperty.aggregate([
      {
        $group: {
          _id: "$month",
          avgResale: { $avg: "$resale_price" },
          avgArea: { $avg: "$floor_area_sqm" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    // Example dummy formula: ROI = (avgResale / avgArea) / 1000
    const formattedROI = roiData.map(item => ({
      date: item._id,
      roi: Number(((item.avgResale / item.avgArea) / 1000).toFixed(2))
    }));
    res.status(200).json(formattedROI);
  } catch (error) {
    next(error);
  }
};

// 3. Flat Type Distribution - Count by flat_type
export const getFlatTypeDistribution = async (req, res, next) => {
  try {
    const distribution = await InvestorProperty.aggregate([
      {
        $group: {
          _id: "$flat_type",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    const formattedDistribution = distribution.map(item => ({
      flat_type: item._id,
      count: item.count
    }));
    res.status(200).json(formattedDistribution);
  } catch (error) {
    next(error);
  }
};

// 4. Town Distribution - Count properties by town
export const getTownDistribution = async (req, res, next) => {
  try {
    const distribution = await InvestorProperty.aggregate([
      {
        $group: {
          _id: "$town",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    const formattedDistribution = distribution.map(item => ({
      town: item._id,
      count: item.count
    }));
    res.status(200).json(formattedDistribution);
  } catch (error) {
    next(error);
  }
};

// 5. Investor Properties with Filtering
// Accepts query parameters: flatType, remainingLease, level, town
export const getInvestorProperties = async (req, res, next) => {
    try {
      let { searchTerm, flatType, remainingLease, level, town } = req.params;
  
      // Interpret "any" as an empty string (no filtering on that field).
      searchTerm = searchTerm === "any" ? "" : searchTerm;
      flatType = flatType === "any" ? "" : flatType;
      remainingLease = remainingLease === "any" ? "" : remainingLease;
      level = level === "any" ? "" : level;
      town = town === "any" ? "" : town;
  
      // Build the query object.
      let query = {};
  
      // Free text search (if provided) - search across one or more text fields.
      if (searchTerm) {
        query.$or = [
          { flat_type: { $regex: searchTerm, $options: "i" } },
          { town: { $regex: searchTerm, $options: "i" } },
          { street_name: { $regex: searchTerm, $options: "i" } }
        ];
      }
  
      if (flatType) {
        query.flat_type = { $regex: flatType, $options: "i" };
      }
      if (remainingLease) {
        query.remaining_lease = { $regex: remainingLease, $options: "i" };
      }
      if (level) {
        query.storey_range = { $regex: level, $options: "i" };
      }
      if (town) {
        query.town = { $regex: town, $options: "i" };
      }
  
      const properties = await InvestorProperty.find(query);
      res.status(200).json(properties);
    } catch (error) {
      next(error);
    }
  };