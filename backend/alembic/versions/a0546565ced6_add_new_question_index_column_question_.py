"""add_new_question_index_column_question_questions_table

Revision ID: a0546565ced6
Revises: 5fc04f661f4c
Create Date: 2023-11-11 08:45:32.452905

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a0546565ced6'
down_revision: Union[str, None] = '5fc04f661f4c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('questions', sa.Column('question_index', sa.Integer, nullable=True))


def downgrade() -> None:
    op.drop_column('questions', 'question_index')
