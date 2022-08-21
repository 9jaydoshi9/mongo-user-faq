const faqService = require("../service/faq.service");
const {
  addCategoryValidation,
  addFaqValidation,
  deleteFaqValidation,
  editFaqValidation,
} = require("../validation/faq.validation");
const { HttpStatus } = require("../util/statusCodes.constant");

const addFaqCategory = async (req, res) => {
  try {
    // validate faq category details
    const valid = addCategoryValidation.validate(req.body);
    if (valid?.error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: valid.error?.message,
      });
    }

    const { success, data } = await faqService.addFaqCategory(req.user, req.body);
    if (!success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data,
      });
    }
    return res.status(HttpStatus.CREATED).send({ success, data });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

const getFaqCategories = async (req, res) => {
  try {
    const { success, data } = await faqService.getFaqCategories(req?.user);
    if (!success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data,
      });
    }
    return res.status(HttpStatus.OK).send({ success, data });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

const addFaq = async (req, res) => {
  try {
    // validate create faq details
    const valid = addFaqValidation.validate(req.body);
    if (valid?.error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: valid.error?.message,
      });
    }

    const { success, data } = await faqService.addFaq(req.user, req.body);
    if (!success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data,
      });
    }
    return res.status(HttpStatus.CREATED).send({ success, data });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

const getFaqs = async (req, res) => {
  try {
    const { success, data } = await faqService.getFaqs(req?.user);
    if (!success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data,
      });
    }
    return res.status(HttpStatus.OK).send({ success, data });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

const deleteFaq = async (req, res) => {
  try {
    // validate delete faq request
    const valid = deleteFaqValidation.validate({
      faqId: req.params.faqId,
      userId: req.user.id,
    });
    if (valid?.error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: valid.error?.message,
      });
    }

    const { success, data } = await faqService.deleteFaq(req?.user, req.params.faqId);
    if (!success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data,
      });
    }
    return res.status(HttpStatus.OK).send({ success, data });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
  }
};

const editFaq = async (req, res) => {
  try {
    // validate edit faq payload
    const valid = editFaqValidation.validate({
      faqId: req.params.faqId,
      userId: req.user.id,
      ...req.body,
    });
    if (valid?.error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: valid.error?.message,
      });
    }

    const { success, data } = await faqService.editFaq(req?.user, req.params.faqId, req.body);
    if (!success) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data,
      });
    }
    return res.status(HttpStatus.OK).send({ success, data });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    });
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
