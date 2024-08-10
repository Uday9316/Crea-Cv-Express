import React from 'react';
import { PTMonoText } from '../StyledComponents';
import styled from 'styled-components';

// Styled components for styling
const PrivacyPolicyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #002a38;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const PrivacyPolicyContent = styled.div`
  background-color: #fdf5e6;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #002a38;
  font-family: 'Menlo, monospace';
  max-width: 600px;
  opacity: 0; /* initially hidden */
  animation: fadeIn 1s ease-out forwards; /* fade-in animation */
  
  h1 {
    color: #007bff;
    text-align: center;
    margin: 0 0 20px;
  }

  p {
    margin-bottom: 15px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const PrivacyPolicy = () => {
  return (
    <PTMonoText>
      <PrivacyPolicyContainer>
        <PrivacyPolicyContent>
          <h1>Créa CVExpress Privacy Policy</h1>
          <p>
            At Créa CVExpress, we are dedicated to safeguarding your privacy. This Privacy Policy explains
            how your personal information is collected, used, and disclosed by Créa CVExpress.
          </p>
          <p>
            <strong>Data Collection and Usage:</strong> We collect and use your personal information for the purpose of providing and improving our services.
            This includes but is not limited to information you provide when using our website or contacting us.
          </p>
          <p>
            <strong>Information Sharing:</strong> We do not sell, trade, or otherwise transfer your personal information to outside parties.
            This does not include trusted third parties who assist us in operating our website or conducting our business, as long as those parties agree to keep this information confidential.
          </p>
          <p>
            <strong>Security:</strong> We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
          </p>
          <p>
            For more information about our privacy practices, if you have questions, or if you would like to make a complaint,
            please contact us by e-mail at privacy@creacvexpress.com.
          </p>
          <p>
            This Privacy Policy was last updated on January 31, 2024.
          </p>
        </PrivacyPolicyContent>
      </PrivacyPolicyContainer>
    </PTMonoText>
  );
};

export default PrivacyPolicy;
