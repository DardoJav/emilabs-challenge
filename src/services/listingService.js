import { findListingById, updateListing, findStepsByListingId, bulkCreateSteps, deleteSteps, updateStep, getListingWithDetails } from '../repository/listingRepository.js';

const updateListingAndSteps = async (listingId, listingData, stepsData, user) => {
    const listing = await findListingById(listingId);
  
    if (!listing) {
      throw new Error('Listing Not Found');
    }
  
    // if (listing.subsidiaryId !== user.subsidiaryId && !user.authorities.includes('ROLE_EMPLOYEE')) {
    //   throw new Error('Forbidden');
    // }
  
    await updateListing(listingId, listingData);
  
    const existingSteps = await findStepsByListingId(listingId);
    const toDelete = existingSteps.filter(step => !stepsData.some(s => s.id === step.id)).map(s => s.id);
    const toUpdate = stepsData.filter(s => s.id > 0);
    const toCreate = stepsData.filter(s => s.id < 0).map(s => ({
      listingId,
      ...s,
    }));
  
    if (toCreate.length > 0) {
      await bulkCreateSteps(toCreate);
    }
  
    if (toDelete.length > 0) {
      await deleteSteps(toDelete);
    }
  
    for (const step of toUpdate) {
      await updateStep(step.id, step);
    }
  
    const updatedListing = await getListingWithDetails(listingId);
    return updatedListing;
  };
  
const createStepsForListing  = async (listingId, steps) => {
    const stepsWithListingId = steps.map(step => ({ listingId, ...step }));
    await bulkCreateSteps(stepsWithListingId);
};
  
export{ updateListingAndSteps, createStepsForListing  };
  