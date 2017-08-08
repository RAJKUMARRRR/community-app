import React from 'react';
import PT from 'prop-types';

import ShareSocial from './ShareSocial';
import Tooltip from './SimpleTooltip';

import styles from '../styles.scss';

export default function DevelopSideBar(props) {
  const {
    documents,
    eventDetail,
    screeningScorecardId,
    reviewScorecardId,
    hasRegistered,
    isDataScience,
    reviewType,
  } = props;
  const eventURL = `//${eventDetail.eventName}.topcoder.com`;
  const scorecardURL = 'https://software.topcoder.com/review/actions/ViewScorecard?scid=';
  const challengeTermsURL = (
    'https://www.topcoder.com/challenge-details/terms/detail/21193/'
  );
  const pageAccent = isDataScience ? 'datasci' : 'develop';

  const commonStyle = 'challenge-spec-sidebar';
  const designStyle = `challenge-spec-sidebar-${pageAccent}`;

  const downloadsPlaceHolder = hasRegistered ? 'None' : 'Register to Download Files (if available)';

  const reviewTypeTitle = reviewType === 'PEER' ? 'Peer Review' : 'Community Review Board';
  const reviewTypeDescription = (
    reviewType === 'PEER' ?
      'Your peers performs a thorough review based on scorecards.' :
      'Community Review Board performs a thorough review based on scorecards.'
  );

  const umlGetMacTool = (
    'https://github.com/topcoderinc/topcoder-UML-Tool/blob/master/build/dist/TopCoder%20UML%20Tool%20OS%20X%201.2.7.zip?raw=true'
  );
  const umlRepo = (
    'https://github.com/topcoderinc/topcoder-UML-Tool'
  );
  const umlGetJava = (
    'https://github.com/topcoderinc/topcoder-UML-Tool/blob/master/build/dist/TopCoder_UML_Tool_Installer-1.2.7.jar?raw=true'
  );

  return (
    <div styleName={`${commonStyle} ${designStyle}`}>
      <div styleName="challenge-sidebar-inner">
        <h3>DOWNLOADS:</h3>
        {
          hasRegistered && documents && documents.length > 0 ? (
            <ul>
              {
                documents.map(doc => (
                  <li><a href={doc.url}>{doc.documentName}</a></li>
                ))
              }
            </ul>
          ) :
            <p>{downloadsPlaceHolder}</p>
        }
        <h3>ELIGIBLE EVENTS:</h3>
        <p><a href={eventURL}>{eventDetail.description}</a></p>
        <h3>REVIEW STYLE:</h3>
        <h4>Final Review:</h4>
        <span>
          {reviewTypeTitle}
          <Tooltip
            content="?"
            heading="Final Review:"
            tooltip={reviewTypeDescription}
            tooltipStyle={styles.tctooltip}
            tooltipTextStyle={`${styles.tctooltiptext} ${styles.tooltiptextreview}`}
          />
        </span>
        <h4>Approval:</h4>
        <span>
          User Sign-Off
          <Tooltip
            content="?"
            heading="Approval:"
            tooltip="Customer has final opportunity to sign-off on the delivered assets."
            tooltipStyle={styles.tctooltip}
            tooltipTextStyle={`${styles.tctooltiptext} ${styles.tooltiptextapproval}`}
          />
        </span>
        <h3>CHALLENGE LINKS:</h3>
        {
          screeningScorecardId ?
            (<p><a href={`${scorecardURL}${screeningScorecardId}`}>Screening Scorecard</a></p>) :
            undefined
        }
        {
          reviewScorecardId ?
            (<p><a href={`${scorecardURL}${reviewScorecardId}`}>Review Scorecard</a></p>) :
            undefined
        }
        <h3>CHALLENGE TERMS:</h3>
        <p><a href={challengeTermsURL}>Standard Terms for TopCoder Competitions v2.1 </a></p>
        <h3>GET THE UML TOOL:</h3>
        <ul>
          <li>
            <a href={umlRepo}>
              {'Github source code repository'}
            </a>
          </li>
          <li>
            <a href={umlGetMacTool}>
              {'Mac disk image'}
            </a>
          </li>
          <li>
            <a href={umlGetJava}>
              {'Java installer'}
            </a>
          </li>
        </ul>
        <h3>SHARE:</h3>
        <ShareSocial />
      </div>
    </div>
  );
}

DevelopSideBar.defaultProps = {
  eventDetail: {
    eventName: '',
    description: '',
  },
  documents: undefined,
  screeningScorecardId: undefined,
  reviewScorecardId: undefined,
  isDataScience: false,
  reviewType: 'COMMUNITY',
  hasRegistered: false,
};

DevelopSideBar.propTypes = {
  eventDetail: PT.shape({
    eventName: PT.string.isRequired,
    description: PT.string.isRequired,
  }),
  documents: PT.shape(),
  screeningScorecardId: PT.number,
  reviewScorecardId: PT.number,
  isDataScience: PT.bool,
  reviewType: PT.string,
  hasRegistered: PT.bool,
};
