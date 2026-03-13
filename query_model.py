#!/usr/bin/env python3
"""
Script to display information about the current AI model being used.
"""

def get_current_model_info():
    """
    Returns information about the current AI model.

    This script is running in the context of Claude Code (claude-sonnet-4-5-20250929).
    """
    model_info = {
        "model_name": "Claude Sonnet 4.5",
        "model_id": "claude-sonnet-4-5-20250929",
        "provider": "Anthropic",
        "description": "Advanced AI assistant powered by Claude Sonnet 4.5",
        "knowledge_cutoff": "January 2025"
    }
    return model_info


def display_model_info():
    """
    Display the current model information in a user-friendly format.
    """
    info = get_current_model_info()

    print("=" * 60)
    print("Current AI Model Information")
    print("=" * 60)
    print(f"Model Name: {info['model_name']}")
    print(f"Model ID: {info['model_id']}")
    print(f"Provider: {info['provider']}")
    print(f"Description: {info['description']}")
    print(f"Knowledge Cutoff: {info['knowledge_cutoff']}")
    print("=" * 60)


if __name__ == "__main__":
    display_model_info()
