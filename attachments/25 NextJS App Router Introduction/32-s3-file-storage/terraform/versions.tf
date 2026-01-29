/**
 * ============================================================================
 * TERRAFORM CONFIGURATION - NextJS Foodies S3 Bucket
 * ============================================================================
 *
 * This Terraform configuration creates an S3 bucket for storing
 * user-uploaded meal images in the NextJS foodies application.
 *
 * Region: ap-northeast-1 (Tokyo) - matching .env.local AWS_REGION
 */

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-1"
  # Uses AWS CLI configuration (aws configure)
  # Or environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
}
