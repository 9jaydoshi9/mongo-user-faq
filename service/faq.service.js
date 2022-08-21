const FaqCategory = require("../model/faqCategory");
const Faq = require("../model/faq");

const addFaqCategory = async (user, faqCategoryDetails) => {
  try {
    const categoryDetails = {
      name: faqCategoryDetails.name,
      description: faqCategoryDetails?.description,
      user: user.id,
    };

    const category = await new FaqCategory(categoryDetails).save();

    return {
      success: true,
      data: {
        category,
        message: "Category Created Successfully.",
      },
    };
  } catch (err) {
    return {
      success: false,
      data: { message: "Invalid Input Please Try Again." },
    };
  }
};

// get faq categories with two faqs for each category
const getFaqCategories = async (user) => {
  try {
    if (!user) {
      throw new Error("User Not Found");
    }
    return {
      success: true,
      data: await FaqCategory.find(
        {
          user: user.id,
        },
        "_id name description faqs"
      ).populate({
        path: "faqs",
        select: "_id question answer",
        options: {
          sort: { createdAt: 1 },
          limit: 2,
        },
        match: { isDeleted: false },
      }),
    };
  } catch (err) {
    return {
      success: false,
      data: "Bad Request",
    };
  }
};

const addFaq = async (user, faqDetailsDto) => {
  try {
    const faqDetails = {
      question: faqDetailsDto.question,
      answer: faqDetailsDto?.answer,
      category: faqDetailsDto?.categoryId,
      user: user.id,
    };

    // add new faq
    const faq = await new Faq(faqDetails).save();

    if (faqDetailsDto?.categoryId) {
      // add faq in the category
      const faqCategory = await FaqCategory.findById(faqDetailsDto.categoryId);

      faqCategory.faqs.push(faq);
      await faqCategory.save();
    }
    return {
      success: true,
      data: {
        faq,
        message: "Faq Added Successfully.",
      },
    };
  } catch (err) {
    return {
      success: false,
      data: { message: "Invalid Input Please Try Again." },
    };
  }
};

// get faq details with its category details
const getFaqs = async (user) => {
  try {
    if (!user) {
      throw new Error("User Not Found");
    }
    return {
      success: true,
      data: await Faq.find(
        {
          user: user.id,
          isDeleted: false,
        },
        "_id question answer category"
      ).populate("category", "name description"),
    };
  } catch (err) {
    return {
      success: false,
      data: "Bad Request",
    };
  }
};

// soft delete faq with given id
const deleteFaq = async (user, faqId) => {
  try {
    if (!user) {
      throw new Error("User Not Found");
    }

    await Faq.updateOne(
      {
        _id: faqId,
      },
      {
        isDeleted: true,
      }
    );
    return {
      success: true,
      data: {
        message: "Faq Deleted.",
      },
    };
  } catch (err) {
    return {
      success: false,
      data: "Bad Request",
    };
  }
};

// edit faq question, answer by id
const editFaq = async (user, faqId, editFaqDto) => {
  try {
    await Faq.updateOne(
      {
        _id: faqId,
        user: user.id,
      },
      editFaqDto
    );
    return {
      success: true,
      data: {
        message: "Faq Edited Successfully.",
      },
    };
  } catch (err) {
    return {
      success: false,
      data: "Bad Request",
    };
  }
};

module.exports = {
  addFaqCategory,
  getFaqCategories,
  addFaq,
  getFaqs,
  deleteFaq,
  editFaq,
};
